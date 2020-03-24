package com.athmovil.athmovil;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import com.evertecinc.athmovil.sdk.checkout.PaymentResponse;
import com.evertecinc.athmovil.sdk.checkout.interfaces.PaymentResponseListener;
import com.evertecinc.athmovil.sdk.checkout.objects.Items;
import com.facebook.react.ReactActivity;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Locale;

public class CheckoutResultActivity extends ReactActivity implements PaymentResponseListener {

  private String APP_SCHEMA = "athmoviltest";
  private String VIEW_COMPONENT_PATH = "paymentresult";

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    PaymentResponse.validatePaymentResponse(getIntent(), this);
  }

  private void callJSResponseView (String status, String referenceNumber, Double total, Double tax, Double subtotal, String metadata1, String metadata2, ArrayList<Items> items) {
    Intent i = new Intent("android.intent.action.VIEW");
    i.setPackage(getPackageName());
    String data = String.format(Locale.getDefault(),"%s/%s/%.2f/%.2f/%.2f/%s/%s/%s", status, referenceNumber, total, tax, subtotal, metadata1, metadata2, new Gson().toJson(items));
    i.setData(Uri.parse(APP_SCHEMA + "://" + VIEW_COMPONENT_PATH + "/" + data));
    startActivity(i);
  }

  @Override
  public void onCompletedPayment(String referenceNumber, Double total, Double tax, Double subtotal, String metadata1, String metadata2, ArrayList<Items> items) {
    callJSResponseView("COMPLETED", referenceNumber, total, tax, subtotal, metadata1, metadata2, items);
  }

  @Override
  public void onCancelledPayment(String referenceNumber, Double total, Double tax, Double subtotal, String metadata1, String metadata2, ArrayList<Items> items) {
    callJSResponseView("CANCELLED", referenceNumber, total, tax, subtotal, metadata1, metadata2, items);
  }

  @Override
  public void onExpiredPayment(String referenceNumber, Double total, Double tax, Double subtotal, String metadata1, String metadata2, ArrayList<Items> items) {
    callJSResponseView("EXPIRED", referenceNumber, total, tax, subtotal, metadata1, metadata2, items);
  }
}
