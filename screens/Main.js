import { StatusBar } from 'expo-status-bar';
import React, { Component } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Platform, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from "react-native";
import { Camera } from "expo-camera";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import * as FaceDetector from "expo-face-detector";
import Filter from '../components/Filter';

const filters = {
  "crown-pic1":{
    src: require("../assets/hats/crown-pic1.png"),
    width: 0.65,
    left: 0.6,
    top: 1.1
  },
  "crown-pic2":{
    src: require("../assets/hats/crown-pic2.png"),
    width: 1.25,
    left: 0.35,
    top: 0.8
  },
  "crown-pic3":{
    src: require("../assets/hats/crown-pic3.png"),
    width: 1.25,
    left: 0.3,
    top: 1.1
  },
  "flower-pic1":{
    src: require("../assets/hats/flower-pic1.png"),
    width: 1,
    left: 0.3,
    top: 1
  },
  "flower-pic2":{
    src: require("../assets/hats/flower-pic2.png"),
    width: 1,
    left: 0.3,
    top: 1
  },
  "flower-pic3":{
    src: require("../assets/hats/flower-pic3.png"),
    width: 1,
    left: 0.3,
    top: 1.2
  },
  "hair-pic1":{
    src: require("../assets/hats/hair-pic1.png"),
    width: 1,
    left: 0.3,
    top: 0.9
  },
  "hat-pic1":{
    src: require("../assets/hats/hat-pic1.png"),
    width: 1.25,
    left: 0.35,
    top: 1.2
  },
  "hat-pic2":{
    src: require("../assets/hats/hat-pic2.png"),
    width: 1.25,
    left: 0.45,
    top: 0.9
  },
  "other-pic1":{
    src: require("../assets/hats/other-pic1.png"),
    width: 1.25,
    left: 0.35,
    top: 1.1
  },
  "other-pic2":{
    src: require("../assets/hats/other-pic2.png"),
    width: 1,
    left: 0.3,
    top: 0.75
  },
  "other-pic3":{
    src: require("../assets/hats/other-pic3.png"),
    width: 1,
    left: 0.3,
    top: 0.75
  },
}

var data = {
  "crown":[
    {"id":1, "name":"crown-pic1", "image":require(`../assets/hats/crown-pic1.png`)},
    {"id":2, "name":"crown-pic2", "image":require(`../assets/hats/crown-pic2.png`)},
    {"id":3, "name":"crown-pic3", "image":require(`../assets/hats/crown-pic3.png`)},
  ],
  "flower":[
    {"id":4, "name":"flower-pic1", "image":require(`../assets/hats/flower-pic1.png`)},
    {"id":5, "name":"flower-pic2", "image":require(`../assets/hats/flower-pic2.png`)},
    //{"id":6, "name":"flower-pic3", "image":require(`../assets/hats/flower-pic3.png`)},
  ],
  "hair":[
    {"id":6, "name":"flower-pic3", "image":require(`../assets/hats/flower-pic3.png`)},
    {"id":7, "name":"hair-pic1", "image":require(`../assets/hats/hair-pic1.png`)},
  ],
  "hat":[
    {"id":8, "name":"hat-pic1", "image":require(`../assets/hats/hat-pic1.png`)},
    {"id":9, "name":"hat-pic2", "image":require(`../assets/hats/hat-pic2.png`)},
  ],
  "other":[
    {"id":10, "name":"other-pic1", "image":require(`../assets/hats/other-pic1.png`)},
    {"id":11, "name":"other-pic2", "image":require(`../assets/hats/other-pic2.png`)},
    {"id":12, "name":"other-pic3", "image":require(`../assets/hats/other-pic3.png`)},
  ],
}

export default class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hasCameraPermission: null,
      faces: [],
      current_filter: "crown-pic1",
      selected: "crown"
    };

    this.onFacesDetected = this.onFacesDetected.bind(this);
  };
  
  async componentDidMount(){
    const { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  };

  onFacesDetected({ faces }){
    this.setState({ faces: faces });
  };

  onFacesDetectionError = (error)=>{
    console.log(error);
  }

  render(){
    const {hasCameraPermission} = this.state;
    if (hasCameraPermission === null){
      return <View/>;
    };
    if (hasCameraPermission === false){
      return(
        <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
          <Text style={styles.noAccessText}>very no access to camera</Text>
        </View>  
      );
    };
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
        <View style={styles.middleContainer}>
          <Camera
            style={styles.cameraStyle}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassififcations: FaceDetector.FaceDetectorClassifications.all
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFacesDetectionError}
          />
          {this.state.faces.map(face=>{
            return <Filter
              key={`face-id-${face.faceID}`}
              face={face}
              source={filters[this.state.current_filter].src}
              width={filters[this.state.current_filter].width}
              left={filters[this.state.current_filter].left}
              top={filters[this.state.current_filter].top}
            />
          })}
            
        </View>
        <View style={styles.frameContainer}>
          <View style={styles.categoryContainer}>
              <TouchableOpacity 
                style={this.state.selected == "crown" ? styles.categoryBoxSelected : styles.categoryBox}
                onPress={()=>this.setState({selected:`crown`})}  
              ><Text style={{color:"#000", fontSize: RFValue(7.5)}}>Crowns</Text></TouchableOpacity>
              <TouchableOpacity 
                style={this.state.selected == "flower" ? styles.categoryBoxSelected : styles.categoryBox}
                onPress={()=>this.setState({selected:`flower`})}  
              ><Text style={{color:"#000", fontSize: RFValue(7.5)}}>Flowers</Text></TouchableOpacity>
              <TouchableOpacity 
                style={this.state.selected == "hair" ? styles.categoryBoxSelected : styles.categoryBox}
                onPress={()=>this.setState({selected:`hair`})}  
              ><Text style={{color:"#000", fontSize: RFValue(7.5)}}>Hairs</Text></TouchableOpacity>
              <TouchableOpacity 
                style={this.state.selected == "hat" ? styles.categoryBoxSelected : styles.categoryBox}
                onPress={()=>this.setState({selected:`hat`})}  
              ><Text style={{color:"#000", fontSize: RFValue(7.5)}}>Hats</Text></TouchableOpacity>
              <TouchableOpacity 
                style={this.state.selected == "other" ? styles.categoryBoxSelected : styles.categoryBox}
                onPress={()=>this.setState({selected:`other`})}  
              ><Text style={{color:"#000", fontSize: RFValue(7.5)}}>Horns & Ears</Text></TouchableOpacity>
          </View>
          </View>

          <View style={styles.filterContainer}>
            <ScrollView style={{flexDirection:"row"}} horizontal showsHorizontalScrollIndicator={false}>
              {
                data[this.state.selected].map(filter_data=>{
                  return <TouchableOpacity style={styles.filterImageContainer} onPress={()=>{
                    this.setState({current_filter: filter_data.name})
                  }}>
                    <Image source={filter_data.image} style={{height:RFValue(50), width:RFValue(60)}}/>
                  </TouchableOpacity>
                })
              } 
            </ScrollView>
          </View>
        {/*</View>*/}
    </View>
    );
  };
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#cccccc"
  },
  iosSafeArea:{
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
  },
  headingContainer:{
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  noAccessText:{
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText:{
    fontSize: 30,
  },
  middleContainer:{
    flex: 0.75
  },
  cameraStyle:{
    flex: 1,
    width: "100%", 
    alignSelf: "center",
  },
  filterContainer:{
    flex: 0.2,
  },
  filterImageContainer:{
    height: RFPercentage(8),
    width: RFPercentage(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginHorizontal:10
  },
  frameContainer:{
    flex:0.2,
    paddingHorizontal: RFValue(20),
    paddingTop: RFValue(10),
  },
  categoryContainer:{
    flex: 0.4,
    justifyContent:"center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: RFValue(10),
  },
  categoryBox:{
    flex:0.2, 
    borderRadius:30,
    borderWidth:1,
    backgroundColor:"white",
    width:"100%",
    padding:RFValue(3),
    margin: 1,
    alignItems:"center"
  },
  categoryBoxSelected:{
    flex:0.2, 
    borderRadius:30,
    borderWidth:1,
    backgroundColor:"orange",
    width:"100%",
    padding:RFValue(3),
    margin: 1,
    alignItems:"center"
  }
});