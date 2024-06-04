package com.v2t.modules;

import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import kotlin.Metadata;
import kotlin.jvm.internal.Intrinsics;
import org.jetbrains.annotations.NotNull;

public final class CalenderModule extends ReactContextBaseJavaModule {
    @NotNull
    private String moduleName;

    @NotNull
    public final String getModuleName() {
        return this.moduleName;
    }

    @NotNull
    public String getName() {
        return this.moduleName;
    }

    @ReactMethod
    public final void createCalenderEvent(String name, String location) {
        Log.d("CalenderModule", "Creating native module under " + name + " and the location is " + location);
        String method = "Singam";
        Log.d(method, method);
    }

    public CalenderModule(@NotNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.moduleName = "CalenderModule";
    }
}
