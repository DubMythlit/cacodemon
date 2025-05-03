package idv.mythlit.cacodemon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class CacodemonApplication {

	public static void main(String[] args) {
		SpringApplication.run(CacodemonApplication.class, args);
	}

}
