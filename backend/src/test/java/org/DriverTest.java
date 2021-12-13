package org;

import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.*;

class DriverTest {

    @Test
    void parse() {

        assert true;
    }

    @Test
    void testBadParse(){
       Driver emptyDriver = new Driver("");
       assertEquals(null, emptyDriver.parse(false));

        Driver badDriver = new Driver(":");
        assertEquals(null, badDriver.parse(false));


    }

    @Test
    void testGoodParse(){
        Driver correctDriver = new Driver("C:\\Windows\\System32\\en");
        assertEquals("{::meta::={size=3537920, htmlId=files0}, ::files::={AuthFWSnapIn.Resources.dll=3136512, AuthFWWizFwk.Resources.dll=56320, fhuxpresentation.Resources.dll=257024, AppVStreamingUX.resources.dll=88064}}", correctDriver.parse(true).toString());
    }
}