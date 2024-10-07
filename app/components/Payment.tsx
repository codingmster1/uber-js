import { useAuth } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
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
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: 'USD',
        },
        confirmHandler: confirmHandler
      }
    });
    if (error) {
      // handle error
    }
  };

  

  const fetchPublishableKey = async () => {
/* const key = await fetchKey();
setPublishableKey(key); */
  }

  useEffect(() => {
  fetchPublishableKey();
  }, []);

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const confirmHandler = async (
    paymentMethod, 
    shouldSavePaymentMethod, 
    intentCreationCallback) => {
   
  }

  const didTapCheckoutButton = async () => {
  
  }
  const openPaymentSheet = async () => {};
  return (
   <>
    <CustomButton 
title="Confirm Ride"
className="my-10 mt-2"
onPress={openPaymentSheet}
    />
      </>
  );
}

export default Payment;