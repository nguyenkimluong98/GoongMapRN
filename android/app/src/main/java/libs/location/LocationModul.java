package libs.location;


import android.Manifest;
import android.annotation.SuppressLint;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.support.annotation.NonNull;
import android.support.v4.content.ContextCompat;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;


import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;
import java.util.Locale;

import io.nlopez.smartlocation.OnLocationUpdatedListener;
import io.nlopez.smartlocation.SmartLocation;

/**
 * Created by Chien on 7/9/2018.
 */


public class LocationModul extends ReactContextBaseJavaModule {

    private final int MAX_TIME_REQUEST = 5 * 1000 * 60;

    private FusedLocationProviderClient mFusedLocationClient;
    private int lastRequest = 0;
    private double lat = 0;
    private double lng = 0;
    private String address = "";

    public LocationModul(ReactApplicationContext reactContext) {
        super(reactContext);
        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(reactContext);
    }
    @ReactMethod
    public  void test(Callback callback){
        callback.invoke("data");
    }

    @Override
    public String getName() {
        return "LocationModul";
    }

    @SuppressLint("MissingPermission")
    @ReactMethod
    public void getLocation(final Callback onErrorCallback, final Callback onSuccessCallback) {

        if (lastRequest + MAX_TIME_REQUEST > AppUtil.unixTime() && lat * lng != 0) {
            onSuccessCallback.invoke(toMap());
        } else if (isLocationAvailable()) {

            mFusedLocationClient.getLastLocation().addOnSuccessListener(new OnSuccessListener<Location>() {
                @Override
                public void onSuccess(Location location) {

                    if (location != null) {
                        lastRequest = AppUtil.unixTime();
                        lat = location.getLatitude();
                        lng = location.getLongitude();
                        address = getAddress(location);
                        onSuccessCallback.invoke(toMap());
                    } else {
                        SmartLocation.with(getReactApplicationContext())
                                .location()
                                .oneFix()
                                .start(new OnLocationUpdatedListener() {
                                    @Override
                                    public void onLocationUpdated(Location location) {
                                        SmartLocation.with(getReactApplicationContext()).location().stop();
                                        lastRequest = AppUtil.unixTime();

                                        lat = location.getLatitude();
                                        lng = location.getLongitude();
                                        address = getAddress(location);

                                        onSuccessCallback.invoke(toMap());
                                    }
                                });
                    }
                }
            }).addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception e) {
                    SmartLocation.with(getReactApplicationContext())
                            .location()
                            .oneFix()
                            .start(new OnLocationUpdatedListener() {
                                @Override
                                public void onLocationUpdated(Location location) {
                                    SmartLocation.with(getReactApplicationContext()).location().stop();
                                    lastRequest = AppUtil.unixTime();

                                    lat = location.getLatitude();
                                    lng = location.getLongitude();
                                    address = getAddress(location);

                                    onSuccessCallback.invoke(toMap());
                                }
                            });
                }
            });

        } else {
            onErrorCallback.invoke("Can not get location");
        }

    }

    private String toMap() {
        try {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("lat", lat);
            jsonObject.put("lng", lng);
            jsonObject.put("address", address);
            return jsonObject.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return  "Can not get location";
        }


    }

    private boolean isLocationAvailable() {
        boolean isAvailable = false;
        if (ContextCompat.checkSelfPermission(getReactApplicationContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
                && ContextCompat.checkSelfPermission(getReactApplicationContext(), Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED
                && SmartLocation.with(getReactApplicationContext()).location().state().locationServicesEnabled()
                && SmartLocation.with(getReactApplicationContext()).location().state().isGpsAvailable()) {
            isAvailable = true;
        }
        return isAvailable;
    }


    private String getAddress(Location location) {
        double lat = location.getLatitude();
        double lng = location.getLongitude();
        String addrs = "";
        Geocoder geocoder = new Geocoder(getReactApplicationContext(), Locale.getDefault());
        try {
            List<Address> addresses = geocoder.getFromLocation(lat, lng, 1);
            if (addresses != null && addresses.size() > 0) {
                Address returnedAddress = addresses.get(0);

                String featureName = returnedAddress.getFeatureName();
                if (featureName != null && !featureName.isEmpty()) {
                    addrs += returnedAddress.getFeatureName() + " ";
                }

                String thoroughfare = returnedAddress.getThoroughfare();
                if (thoroughfare != null && !thoroughfare.isEmpty()) {
                    addrs += returnedAddress.getThoroughfare() + ", ";
                }

                String subAdminArea = returnedAddress.getSubAdminArea();
                if (subAdminArea != null && !subAdminArea.isEmpty()) {
                    addrs += returnedAddress.getSubAdminArea() + ", ";
                }

                String adminArea = returnedAddress.getAdminArea();
                if (adminArea != null && !adminArea.isEmpty()) {
                    addrs += returnedAddress.getAdminArea() + ", ";
                }

                String countryName = returnedAddress.getCountryName();
                if (countryName != null && !countryName.isEmpty()) {
                    addrs += returnedAddress.getCountryName();
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return addrs;
    }

}