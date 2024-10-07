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



  useEffect(() => {
    initializePaymentSheet();
  }, []);

/*   const confirmHandler = async (
    paymentMethod, 
    shouldSavePaymentMethod, 
    intentCreationCallback) => {
   
  } */

  const didTapCheckoutButton = async () => {
  }
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
        // Customer canceled - you should probably do nothing.
      } else {
        // PaymentSheet encountered an unrecoverable error. You can display the error to the user, log it, etc.
      }
    } else {
      // Payment completed - show a confirmation screen.
    }
  };
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