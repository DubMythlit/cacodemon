package idv.mythlit.cacodemon.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SHA256EncoderUtil {
    public static String SHA256Encode(String text){
        if (text == null || text.isEmpty()) {
            return null;
        }

        try {
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            messageDigest.update(text.getBytes());
            byte[] byteBuffer = messageDigest.digest();

            StringBuilder strHexString = new StringBuilder();
            for (byte b : byteBuffer) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    strHexString.append('0');
                }
                strHexString.append(hex);
            }
            return strHexString.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
}
