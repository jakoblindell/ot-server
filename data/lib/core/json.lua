-- A small JSON encoder for messages to our client (extended opcodes).
-- Tables with only 1..n keys become arrays, others objects; an empty table
-- is an array unless json.object{} marks it.
json = json or {}

local objectMarker = {}

function json.object(t)
	return setmetatable(t or {}, objectMarker)
end

local escapes = { ['"'] = '\\"', ['\\'] = '\\\\', ['\n'] = '\\n', ['\r'] = '\\r', ['\t'] = '\\t' }

local function encodeString(s)
	return '"' .. s:gsub('[%c"\\]', function(c)
		return escapes[c] or string.format('\\u%04x', c:byte())
	end) .. '"'
end

local function isArray(t)
	if getmetatable(t) == objectMarker then
		return false
	end
	local n = 0
	for k in pairs(t) do
		if type(k) ~= 'number' or k < 1 or k % 1 ~= 0 then
			return false
		end
		n = math.max(n, k)
	end
	return n == #t
end

function json.encode(value)
	local kind = type(value)
	if kind == 'string' then
		return encodeString(value)
	elseif kind == 'number' then
		if value ~= value or value == math.huge or value == -math.huge then
			return 'null'
		end
		return value % 1 == 0 and string.format('%d', value) or tostring(value)
	elseif kind == 'boolean' then
		return value and 'true' or 'false'
	elseif kind == 'table' then
		local parts = {}
		if isArray(value) then
			for _, item in ipairs(value) do
				parts[#parts + 1] = json.encode(item)
			end
			return '[' .. table.concat(parts, ',') .. ']'
		end
		for k, v in pairs(value) do
			parts[#parts + 1] = encodeString(tostring(k)) .. ':' .. json.encode(v)
		end
		return '{' .. table.concat(parts, ',') .. '}'
	end
	return 'null'
end
