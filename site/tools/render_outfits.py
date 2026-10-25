"""Renders 7.92 outfits from the client's Tibia.dat/Tibia.spr to PNG, facing
south and standing, for the website (static/outfits/<looktype>.png).

    python3 tools/render_outfits.py ../SabrehavenOTClient/data/things/792 static/outfits 128 129 136 137

Colours: --colors HEAD,BODY,LEGS,FEET (the game's 0-132 outfit palette),
default 78,69,58,76.
"""
import argparse
import os
import struct

from PIL import Image

# Thing attribute flags of the 7.80-8.54 dat format that carry data, with its
# size: ground speed, writable and writable-once length, light, displacement,
# elevation, minimap colour, lens help (flag 8, charges, carries nothing)
ATTRIBUTE_SIZES = {0: 2, 9: 2, 10: 2, 22: 4, 25: 4, 26: 2, 29: 2, 30: 2}


def outfit_color(color):
    """The game's outfit palette (port of otclient's Outfit::getColor)."""
    steps, values = 19, 7
    if color >= steps * values:
        color = 0
    if color % steps:
        hue = color % steps / 18.0
        saturation, value = [(0.25, 1.0), (0.25, 0.75), (0.5, 0.75), (0.667, 0.75), (1.0, 1.0), (1.0, 0.75), (1.0, 0.5)][color // steps]
    else:
        hue, saturation, value = 0.0, 0.0, 1 - color / steps / values
    if value == 0:
        return (0, 0, 0)
    if saturation == 0:
        grey = int(value * 255)
        return (grey, grey, grey)
    low = value * (1 - saturation)
    if hue < 1 / 6:
        red, blue = value, low
        green = blue + (value - blue) * 6 * hue
    elif hue < 2 / 6:
        green, blue = value, low
        red = green - (value - blue) * (6 * hue - 1)
    elif hue < 3 / 6:
        green, red = value, low
        blue = red + (value - red) * (6 * hue - 2)
    elif hue < 4 / 6:
        blue, red = value, low
        green = blue - (value - red) * (6 * hue - 3)
    elif hue < 5 / 6:
        blue, green = value, low
        red = green + (value - green) * (6 * hue - 4)
    else:
        red, green = value, low
        blue = red - (value - green) * (6 * hue - 5)
    return (int(red * 255), int(green * 255), int(blue * 255))


def read_dat(path):
    """{outfit id: thing} for the creature section of the dat file."""
    data = open(path, "rb").read()
    _, items, outfits, _, _ = struct.unpack_from("<IHHHH", data, 0)
    pos = 12
    things = {}
    for client_id in range(100, items + outfits + 1):
        while True:
            flag = data[pos]
            pos += 1
            if flag == 0xFF:
                break
            pos += ATTRIBUTE_SIZES.get(flag, 0)
        width, height = data[pos], data[pos + 1]
        pos += 2
        if width > 1 or height > 1:
            pos += 1  # exact size
        layers, pattern_x, pattern_y, pattern_z, frames = data[pos:pos + 5]
        pos += 5
        count = width * height * layers * pattern_x * pattern_y * pattern_z * frames
        sprites = struct.unpack_from(f"<{count}H", data, pos)
        pos += count * 2
        if client_id > items:
            things[client_id - items] = dict(width=width, height=height, layers=layers, pattern_x=pattern_x,
                                             pattern_y=pattern_y, pattern_z=pattern_z, frames=frames, sprites=sprites)
    return things


class Sprites:
    def __init__(self, path):
        self.data = open(path, "rb").read()
        self.count = struct.unpack_from("<H", self.data, 4)[0]

    def image(self, sprite_id):
        image = Image.new("RGBA", (32, 32))
        if not 0 < sprite_id <= self.count:
            return image
        offset = struct.unpack_from("<I", self.data, 6 + (sprite_id - 1) * 4)[0]
        if not offset:
            return image
        size = struct.unpack_from("<H", self.data, offset + 3)[0]
        pos, end, pixel = offset + 5, offset + 5 + size, 0
        pixels = image.load()
        while pos < end:
            transparent, colored = struct.unpack_from("<HH", self.data, pos)
            pos += 4
            pixel += transparent
            for _ in range(colored):
                pixels[pixel % 32, pixel // 32] = (*self.data[pos:pos + 3], 255)
                pos += 3
                pixel += 1
        return image


def render(thing, sprites, colors, direction=2):
    width, height = thing["width"], thing["height"]

    def layer_image(layer):
        canvas = Image.new("RGBA", (width * 32, height * 32))
        for h in range(height):
            for w in range(width):
                index = ((((direction * 1 + 0) * thing["layers"] + layer) * height + h) * width + w)
                # frame 0, pattern y 0 (no addons), pattern z 0: the index above
                # already is (x * layers + layer) * h * w ... for those zeros
                canvas.alpha_composite(sprites.image(thing["sprites"][index]), ((width - w - 1) * 32, (height - h - 1) * 32))
        return canvas

    base = layer_image(0)
    if thing["layers"] < 2:
        return base
    mask = layer_image(1)
    tints = {(255, 255, 0): colors[0], (255, 0, 0): colors[1], (0, 255, 0): colors[2], (0, 0, 255): colors[3]}
    base_pixels, mask_pixels = base.load(), mask.load()
    for y in range(base.height):
        for x in range(base.width):
            tint = tints.get(mask_pixels[x, y][:3]) if mask_pixels[x, y][3] else None
            if tint:
                r, g, b, a = base_pixels[x, y]
                base_pixels[x, y] = (r * tint[0] // 255, g * tint[1] // 255, b * tint[2] // 255, a)
    return base


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("things", help="directory with Tibia.dat and Tibia.spr")
    parser.add_argument("out")
    parser.add_argument("looktypes", nargs="+", type=int)
    parser.add_argument("--colors", default="78,69,58,76")
    args = parser.parse_args()
    colors = [outfit_color(int(c)) for c in args.colors.split(",")]
    things = read_dat(os.path.join(args.things, "Tibia.dat"))
    sprites = Sprites(os.path.join(args.things, "Tibia.spr"))
    os.makedirs(args.out, exist_ok=True)
    for looktype in args.looktypes:
        render(things[looktype], sprites, colors).save(os.path.join(args.out, f"{looktype}.png"))
        print(f"{looktype}: {things[looktype]['width']}x{things[looktype]['height']}, {things[looktype]['layers']} layers")


if __name__ == "__main__":
    main()
