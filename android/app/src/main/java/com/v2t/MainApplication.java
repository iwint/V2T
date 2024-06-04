package com.v2t;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactHost;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.defaults.DefaultReactHost;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.react.flipper.ReactNativeFlipper;
import com.facebook.soloader.SoLoader;
import java.util.ArrayList;
import java.util.List;
import kotlin.Metadata;
import kotlin.jvm.internal.Intrinsics;
import org.jetbrains.annotations.NotNull;

public final class MainApplication extends Application implements ReactApplication {
    @NotNull
    private final ReactNativeHost reactNativeHost = (ReactNativeHost)(new DefaultReactNativeHost((Application)this) {
        private final boolean isNewArchEnabled = false;
        private final boolean isHermesEnabled = true;

        @NotNull
        protected List getPackages() {
            ArrayList var1 = (new PackageList((ReactNativeHost)this)).getPackages();
            boolean var3 = false;
            var1.add(new MyAppPackage());
            Intrinsics.checkNotNullExpressionValue(var1, "PackageList(this).packag…pPackage())\n            }");
            return (List)var1;
        }

        @NotNull
        protected String getJSMainModuleName() {
            return "index";
        }

        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        protected boolean isNewArchEnabled() {
            return this.isNewArchEnabled;
        }

        @NotNull
        protected Boolean isHermesEnabled() {
            return this.isHermesEnabled;
        }
    });

    @NotNull
    public ReactNativeHost getReactNativeHost() {
        return this.reactNativeHost;
    }

    @NotNull
    public ReactHost getReactHost() {
        Context var10000 = this.getApplicationContext();
        Intrinsics.checkNotNullExpressionValue(var10000, "this.applicationContext");
        return DefaultReactHost.getDefaultReactHost(var10000, this.getReactNativeHost());
    }

    public void onCreate() {
        super.onCreate();
        SoLoader.init((Context)this, false);
        Context var10000 = (Context)this;
        ReactInstanceManager var10001 = this.getReactNativeHost().getReactInstanceManager();
        Intrinsics.checkNotNullExpressionValue(var10001, "reactNativeHost.reactInstanceManager");
        ReactNativeFlipper.initializeFlipper(var10000, var10001);
    }
}
