import { useAuth } from "@clerk/clerk-expo";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "../components/CustomButton";
import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "../store";
import { PaymentProps } from "@/types/type";


const Payment = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  
  
  const confirmHandler = async (paymentMethod, shouldSavePaymentMethod, intentCreationCallback) => {
    // Make a request to your own server, passing paymentMethod.id and shouldSavePaymentMethod.
    const response = await fetch(`${API_URL}/create-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        payment_method_id: paymentMethod.id,
        should_save_payment_method: shouldSavePaymentMethod,
    }});
    // Call the `intentCreationCallback` with your server response's client secret or error
    const { client_secret, error } = await response.json();
    if (client_secret) {
      intentCreationCallback({clientSecret: client_secret});
    } else {
      intentCreationCallback({error});
    }
  }



  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: 'USD',
        },
        confirmHandler: confirmHandler,
      }
    });
    if (error) {
      // handle error
    }
  };



  useEffect(() => {
    initializePaymentSheet();
  }, []);


  const didTapCheckoutButton = async () => {
  }


  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) { 
        Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };
  return (
   <>
    <CustomButton 
title="Confirm Ride"
className="my-10 mt-0"
onPress={openPaymentSheet}
    />
      </>
  );
}

export default Payment;