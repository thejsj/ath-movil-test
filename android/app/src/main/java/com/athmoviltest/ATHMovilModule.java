package com.athmovil.athmovil;

import android.content.Intent;

import com.evertecinc.athmovil.sdk.checkout.OpenATHM;
import com.evertecinc.athmovil.sdk.checkout.exceptions.InvalidPaymentTotalAmountException;
import com.evertecinc.athmovil.sdk.checkout.exceptions.InvalidPublicTokenException;
import com.evertecinc.athmovil.sdk.checkout.exceptions.NullATHMPaymentObjectException;
import com.evertecinc.athmovil.sdk.checkout.exceptions.NullApplicationContextException;
import com.evertecinc.athmovil.sdk.checkout.objects.ATHMPayment;
import com.evertecinc.athmovil.sdk.checkout.objects.Items;
import com.evertecinc.athmovil.sdk.checkout.utils.ConstantUtil;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ATHMovilModule extends ReactContextBaseJavaModule {

  ATHMovilModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  public String getName() {
    return "ATHMovil";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put("TOKEN_FOR_SUCCESS", ConstantUtil.TOKEN_FOR_SUCCESS);
    constants.put("TOKEN_FOR_FAILURE", ConstantUtil.TOKEN_FOR_FAILURE);

    return constants;
  }

  private Items parseItem (Object item) {
    HashMap itemHM = (HashMap) item;
    String name = (String) itemHM.get("name");
    String desc = (String) itemHM.get("desc");
    Double price = (Double) itemHM.get("price");
    Long quantity = ((Double) itemHM.get("quantity")).longValue();
    String metadata = (String) itemHM.get("metadata");
    return new Items(name, desc, price, quantity, metadata);
  }

  private ArrayList<Items> parseItems (ArrayList items) {
    ArrayList<Items> parsedItems = new ArrayList();
    for (int i=0; i<items.size(); i++) {
      parsedItems.add(parseItem(items.get(i)));
    }
    return parsedItems;
  }

  private void _pay(Long timeout, String schema, String publicToken, Double total, Double subtotal,
    Double tax, String metadata1, String metadata2, ReadableArray items) throws InvalidPublicTokenException, InvalidPaymentTotalAmountException, NullApplicationContextException, NullATHMPaymentObjectException {
    ATHMPayment payment = new ATHMPayment(getCurrentActivity());
    payment.setTimeout(timeout);
    payment.setBuildType("");
    payment.setCallbackSchema(schema);
    payment.setPublicToken(publicToken);
    payment.setTotal(total);
    payment.setSubtotal(subtotal);
    payment.setTax(tax);
    payment.setMetadata1(metadata1);
    payment.setMetadata2(metadata2);
    if (items != null) {
      payment.setItems(parseItems(items.toArrayList()));
    }

    getCurrentActivity().getIntent().setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    OpenATHM.validateData(payment);
  }

  @ReactMethod
  public void pay(String schema, String publicToken, Double total, Double subtotal, Double tax, String metadata1, String metadata2, ReadableArray items, Callback errorCallback) {
    try {
      _pay(600L, schema, publicToken, total, subtotal, tax, metadata1, metadata2, items);
    }
    catch (Exception e) {
      errorCallback.invoke(e.getMessage());
    }
  }

  @ReactMethod
  public void payWithTimeout(Double timeout, String schema, String publicToken, Double total, Double subtotal, Double tax, String metadata1, String metadata2, ReadableArray items, Callback errorCallback) {
    try {
      _pay(timeout.longValue(), schema, publicToken, total, subtotal, tax, metadata1, metadata2, items);
    }
    catch (Exception e) {
      errorCallback.invoke(e.getMessage());
    }
  }
}
