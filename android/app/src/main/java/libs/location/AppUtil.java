package libs.location;

import java.util.Calendar;

public class AppUtil {
    public static int unixTime() {
        Calendar cal = Calendar.getInstance();
        return (int) (cal.getTimeInMillis() / 1000);
    }
}
