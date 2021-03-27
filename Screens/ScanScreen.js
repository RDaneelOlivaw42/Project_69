import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

const imgSource = {
    uri:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg'
};

export default class ScanScreen extends React.Component {


    constructor(){
        super();
        this.state = {
            hasCameraPermission: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        };
    };


    getCameraPermission = async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setState = ({
            hasCameraPermission: "granted",
            scanned: false,
            buttonState: "clicked"
        });
    };

    
    handleBarCodeScanner = async(type, data)=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: "clicked"
        });
    };


    render(){
        const hasCameraPermissions = this.state.hasCameraPermission;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === "clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned = { scanned ? undefined : this.handleBarCodeScanner }
                style = {StyleSheet.absoluteFillObject}/>
            );
        }

        else if(buttonState === "normal"){
            return(
                <View style = {styles.container}>
                    <View style = {styles.imageContainer}>
                    <Image source = {imgSource} style = {styles.image}/>
                    </View>

                    <Text style = {styles.requestText}>{hasCameraPermissions === true ?
                    this.state.scannedData : "Request Camera Permission"}
                    </Text>

                    <TouchableOpacity onPress = {this.getCameraPermission} style = {styles.scanButton}>
                        <Text style = {styles.Text}>Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            );
        };
        
    };

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 4,
    },

    imageContainer: {
        shadowColor: '#000000',
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 11
    },

    Text: {
        fontSize: 20
    },

    scanButton: {
        backgroundColor: "red",
        padding: 10,
    },

    requestText: {
        fontSize: 20,
        margin: 25
    }

});