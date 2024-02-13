package com.v2t.modules
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CalenderModule(reactContext : ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    var moduleName : String = "CalenderModule"
    override fun getName(): String {
        return moduleName
    }

    @ReactMethod fun createCalenderEvent(name:String , location:String){
        Log.d("CalenderModule","Creating native module under ${name} and the location is ${location}")
    }
}