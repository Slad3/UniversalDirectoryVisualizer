import org.Driver;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;

public class DriverTest {
    public static void main(String [] args){

        long start = System.currentTimeMillis();

        Driver driver = new Driver("C:\\Users\\Ben\\Documents\\Cheat Sheets\\");
//        Driver driver = new Driver("C:\\Program Files\\");
//        Driver driver = new Driver("C:\\");
//        Driver driver = new Driver(".");
        System.out.println(driver.parse());


// ...
        long finish = System.currentTimeMillis();
        System.out.println((finish - start)/1000.0);

    }

}
