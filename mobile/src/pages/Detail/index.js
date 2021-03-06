import React from "react";
import { View, Image, Text, TouchableOpacity, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";
import styles from "./styles";
import logoImg from "../../assets/logo.png";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const { incident } = route.params;
  const message = `Óla ${incident.name}, estou em entrando em contato pois gostaria de ajudar no caso "${
    incident.title
  }" com o valor de ${Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL"
  }).format(incident.value)}`;

  function navigateToDetail() {
    navigation.goBack();
  }

  async function sendMail() {
    await MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }
  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?text=${message}&phone=55${incident.whatsapp}`);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={navigateToDetail}
        >
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
        <Image source={logoImg} />
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO: </Text>
        <Text style={styles.incidentValue}>{incident.title} </Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL"
          }).format(incident.value)}
        </Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
