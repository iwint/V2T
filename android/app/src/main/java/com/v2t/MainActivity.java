package com.v2t;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import kotlin.Metadata;
import org.jetbrains.annotations.NotNull;

public final class MainActivity extends ReactActivity {
    @NotNull
    protected String getMainComponentName() {
        return "V2T";
    }

    @NotNull
    protected ReactActivityDelegate createReactActivityDelegate() {
        return (ReactActivityDelegate)(new DefaultReactActivityDelegate((ReactActivity)this, this.getMainComponentName(), DefaultNewArchitectureEntryPoint.getFabricEnabled()));
    }
}
