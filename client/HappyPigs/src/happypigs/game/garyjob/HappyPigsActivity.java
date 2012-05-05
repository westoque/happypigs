package happypigs.game.garyjob;

//import android.app.Activity;
import org.apache.cordova.*;

import android.os.Bundle;

public class HappyPigsActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
    	
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
        //super.loadUrl("file:///android_asset/www/helloWorld.html");
        //setContentView(R.layout.main); 
    }
}