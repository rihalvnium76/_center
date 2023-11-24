package util;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

public class SlotString {
  /**
   * 将 src 中的占位符（${}、#{}、{}）替换为 dest 中的值.<br>
   * dest 中的值默认使用 toString() 转为字符串，BigDecimal 类型的值会使用 toPlainString() 转换，null 会被转为 "".<br>
   * 支持使用 \ 转义符号为普通文字.<br>
   * 使用不支持的语法会导致非预期的解析.
   * 
   * @param src  源字符串.
   * @param dest 替换表.
   * @return 输出字符串.
   */
  public static String format(String src, Map<String, Object> dest) {
    if (src == null || src.isEmpty()) {
      return src;
    }
    StringBuilder res = new StringBuilder();
    StringBuilder key = null; // initially null
    int state = 0;
    char prev = 0;
    for (int i = 0; i < src.length();) {
      char c = src.charAt(i);
      if (state == 0) {
        if (c == '#' || c == '$') {
          state = 1;
          prev = c;
        } else if (c == '{') {
          state = 2;
          key = new StringBuilder();
        } else if (c == '\\') {
          state = 3;
        } else  {
          res.append(c);
        }
      } else if (state == 1) {
        if (c == '{') {
          state = 2;
          key = new StringBuilder();
        } else {
          state = 0;
          res.append(prev);
          continue;
        }
      } else if (state == 2) {
        if (c == '}') {
          state = 0;
          Object val = null;
          if (dest != null) {
            val = dest.get(key.toString());
          }
          if (val == null) {
            val = "";
          } else if (val instanceof BigDecimal) {
            val = ((BigDecimal) val).toPlainString();
          }
          res.append(val);
        } else if (c == '\\') {
          state = 4;
        } else {
          key.append(c);
        }
      } else if (state == 3) {
        state = 0;
        res.append(c);
      } else if (state == 4) {
        state = 2;
        key.append(c);
      }
      ++i;
    }
    return res.toString();
  }

  public static void main(String[] args) {
    long t = System.currentTimeMillis();
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
    System.out.println(format(" [\\#\\{0}] [\\$\\{0}] [\\{0}]  \\{{0}\\}", dest));
    System.out.println(System.currentTimeMillis() - t);

    System.out.println(format(" [\\?{0}] \\{{0}}", dest));
    System.out.println(format(" [#${0}] [#\\${0}] [#$\\{0}]", dest));
    System.out.println(format(" [{0]", dest));
    System.out.println(format(" <{\\\\}}> [{}] [{\\}}] ", dest));
  }
}
