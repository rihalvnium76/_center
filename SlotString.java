import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

public class SlotString {
	/**
	 * 支持占位符替换的格式化字符串. <br>
	 * 会把 {@code src} 中的占位符 #{NAME} 或 ${NAME} 或 {NAME} 取 {@code dest} 中键为 NAME
	 * 的值进行替换.<br>
	 * 占位符前前加 \ 会将整个占位原样显示.<br>
	 * 其中 \#{} \${} 的转义原理是 \ 后一个字符到 } 之间原样显示，<br>
	 * 而 \{} 转义原理是仅转义 {，使 } 不成对单独显示，当然为稳定也可以写成 \{ \}.<br>
	 * \\ 会显示为 \.<br>
	 * 不要使用不支持的语法，否则会出现未定义行为.
	 * 
	 * @param src  源字符串.
	 * @param dest 替换字符串字典.
	 * @return 新字符串
	 */
	// TODO: 增强版本 支持传入初始容量 支持按传入的日期格式格式化所有相关类型的值 支持集合按指定的分割符join所有元素
	public static String format(String src, Map<String, Object> dest) {
		if (src == null || src.isEmpty()) {
			return src;
		}
		Map<String, Object> dest0 = dest;
		if (dest0 == null) {
			dest0 = new HashMap<>(0);
		}
		StringBuilder res = new StringBuilder();
		StringBuilder key = null;
		int state = 0;
		char prev = 0;
		for (int i = 0; i < src.length(); ++i) {
			char c = src.charAt(i);
			switch (state) {
			case 0:
				switch (c) {
				case '#':
				case '$':
					state = 1;
					prev = c;
					continue;
				case '{':
					state = 2;
					key = new StringBuilder();
					continue;
				case '\\':
					state = 3;
					continue;
				default:
					res.append(c);
					continue;
				}
			case 1:
				if (c == '{') {
					state = 2;
					key = new StringBuilder();
					continue;
				} else {
					state = 0;
					res.append(prev);
					--i;
				}
				continue;
			case 2:
				if (c == '}') {
					state = 0;
					Object val = dest0.get(key.toString());
					if (val == null) {
						val = "";
					} else if (val instanceof BigDecimal) {
						val = ((BigDecimal) val).toPlainString();
					}
					res.append(val);
				} else {
					key.append(c);
				}
				continue;
			case 3:
				switch (c) {
				case '\\':
				case '{':
				case '}':
					state = 0;
					res.append(c);
					continue;
				case '#':
				case '$':
					state = 4;
					break;
				default:
					state = 0;
					res.append('\\').append(c);
					continue;
				}
			case 4:
				if (c == '}') {
					state = 0;
				}
				res.append(c);
			}
		}
		return res.toString();
	}

	public static void main(String[] args) {
		Map<String, Object> dest = new HashMap<>();
		dest.put("123", -123);
		dest.put("ABC", "-ABC");
		dest.put("123_ABC", "-123_ABC");
		System.out.println(format(" [${123}] [#{ABC}] [{123_ABC}]", dest));
		System.out.println(format(" [${}] [#{void}] [{-1}]", dest));
		dest.put("0", new BigDecimal("1E+10"));
		dest.put("1", 1.0);
		dest.put("2", 1.0f);
		dest.put("3", 1000000);
		dest.put("4", 1000000L);
		dest.put("\\", 999);
		dest.put("", 888);
		dest.put("}", 777);
		System.out.println(format(" [${0}] [#{1}] [{2}] <${3}> (#{4})", dest));
		System.out.println(format(" [\\#{0}] [\\${0}] [\\{0}]  \\{{0}\\}", dest));
		System.out.println(format(" [\\?{0}]", dest));
		System.out.println(format(" [#${0}] [#\\${0}] [#$\\{0}]", dest));
		System.out.println(format(" [{0]", dest));
		System.out.println(format(" <{\\\\}}> [{}] [{\\}] ", dest));
	}
}
