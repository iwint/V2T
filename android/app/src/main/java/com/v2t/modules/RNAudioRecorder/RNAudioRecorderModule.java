package com.v2t.modules.RNAudioRecorder;

import android.Manifest;
import android.content.pm.PackageManager;
import android.media.MediaRecorder;
import android.os.Build;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.v2t.BuildConfig;

import org.jetbrains.annotations.NotNull;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.security.Permission;
import java.security.Permissions;
import java.sql.Array;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;


public class RNAudioRecorderModule extends ReactContextBaseJavaModule{

    String moduleName;
    MediaRecorder mediaRecorder;


    private boolean isRecording = false;
    private final Integer REQUEST_CODE = 200;
    private boolean permissionGranted = false;
    private String[] permissions = new String[]{Manifest.permission.RECORD_AUDIO};
    private String outputFile;
    public RNAudioRecorderModule(@NotNull ReactApplicationContext context){
        super(context);
        this.moduleName = "RNAudioRecorderModule";
    }

    private void requestPermission(){
            ActivityCompat.requestPermissions(this.getCurrentActivity(),permissions,REQUEST_CODE);
    }
    @NonNull
    public String getName() {
        return moduleName;
    }
    @NotNull
    public final String getModuleName() {
        return this.moduleName;
    }
    @ReactMethod
    private void isRecording(Callback callback){
        callback.invoke(isRecording);
    }

    private String getOutputFilePath(){
        String root = Environment.getExternalStorageDirectory().getAbsolutePath();
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String filePath = root + "/recordings/" + timeStamp+".mp3";
        File file = new File(filePath);
        file.getParentFile().mkdirs();
        return filePath;
    }

    @ReactMethod
    private void startRecord(Promise promise) throws JSONException  {
        permissionGranted = ContextCompat.checkSelfPermission(this.getReactApplicationContext(),permissions[0]) == PackageManager.PERMISSION_GRANTED;
        try {
            if(permissionGranted){
                isRecording = true;
                String filePath = getOutputFilePath();
                JSONObject result = new JSONObject();
                mediaRecorder = new MediaRecorder();
                mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
                mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
                mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);
                outputFile = filePath;
                mediaRecorder.setOutputFile(outputFile);
                mediaRecorder.prepare();
                mediaRecorder.start();
                isRecording = false;
                result.put("uri",outputFile);
                promise.resolve(result);
            }else{
                requestPermission();
            }
        }catch (IOException e){
            promise.reject("ERROR OCCURRED",e.getMessage());
        }

    }

}
