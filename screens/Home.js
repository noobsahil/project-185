import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform, 
  StatusBar, 
  SafeAreaView,
  Image
} from "react-native";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

export default class Home extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <SafeAreaView style={styles.iosSafeArea}/>
        <StatusBar backgroundColor="#000"/>
        <View style={styles.headingContainer}>
          <Image
            style={{width: RFValue(75), height: RFValue(75)}}
            source={require('../assets/logo2.png')}
          />
          <Text style={styles.titleText}>  DisguiseCam</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={{color: "#fff", fontSize: RFValue(15), marginHorizontal: RFValue(5), marginTop:RFValue(10)}}>
            DisguiseCam is filter app that allows you to disguise yourself with assessories like hats and hair.
          </Text>
          <View style={{flexDirection:'row', marginTop:RFValue(40)}}>
            <Image
              style={{width: RFValue(60), height: RFValue(50), marginHorizontal:RFValue(10)}}
              source={require('../assets/hats/crown-pic1.png')}
            />
            <Image
              style={{width: RFValue(75), height: RFValue(30), marginTop:RFValue(10), marginHorizontal:RFValue(10)}}
              source={require('../assets/hats/flower-pic2.png')}
            />
          </View>
          <View style={{flexDirection:'row', marginTop:RFValue(20)}}>
          <Image
              style={{width: RFValue(65), height: RFValue(45), marginTop:RFValue(5), marginHorizontal:RFValue(10)}}
              source={require('../assets/hats/other-pic1.png')}
            />
            <Image
              style={{width: RFValue(70), height: RFValue(45), marginTop:RFValue(10), marginHorizontal:RFValue(10)}}
              source={require('../assets/hats/hat-pic1.png')}
            />
          </View>
        </View>

        
        <TouchableOpacity style={styles.tryButton} onPress={()=>{this.props.navigation.navigate("Main")}}>
          <Text style={{color: "#fff", fontWeight: "bold", fontSize: RFValue(20), fontStyle:"italic"}}>Disguise Now!</Text>
        </TouchableOpacity>
      </View>    
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#cccccc"
  },
  iosSafeArea:{
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
  },
  headingContainer:{
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  titleText:{
    fontSize: 30,
  },
  infoBox:{
    alignSelf:"center",
    borderRadius:10,
    width:RFValue(200),
    height:RFValue(300),
    backgroundColor:"#f67d26",
    alignItems: "center",
    borderColor:"#fbcd8f",
    borderWidth:3,
    marginVertical: RFValue(20)
  },
  tryButton:{
    alignSelf:"center",
    borderRadius:10,
    width:RFValue(200),
    height:RFValue(75),
    backgroundColor:"#f67d26",
    justifyContent: "center",
    alignItems: "center",
    borderColor:"#fbcd8f",
    borderWidth:3,
  }
});