import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonSample from '../components/button';
import Dropdown from "../components/dropdown";
import Header from "../components/header";


const CreateJobListing = () => {


    const [employmentType, setEmploymentType] = useState('');
    const [minExp, setMinExp] = useState('');
    const [maxExp, setMaxExp] = useState('');


    return(

        
        <SafeAreaView >
            <ScrollView>

            <Header text={''}/>

            <View style={[styles.viewStyle, {marginTop: -20}]}>
                
                <Text style={styles.headerTextStyle}>Create Job Listing</Text>
                <Text style={styles.subTextStyle}>Enter the job details on we can help you attract</Text>
                <Text style={[styles.subTextStyle, {marginTop: -10}]}>top talent</Text>
            </View>

            {/* Job Title text & TextInput */}
            <View style={styles.nViewStyle}>
                <Text style={styles.labelStyle}>Job Title</Text>
                <TextInput
                placeholder="e.g Marketing Manager"
                style={styles.textInputStyle }/>
            </View>

             {/* Location text & TextInput */}
            <View style={styles.nViewStyle}>
                <Text style={styles.labelStyle}>Location</Text>
                <TextInput
                placeholder="e.g Enugu, Enugu"
                style={styles.textInputStyle }/>
            </View>


            <View style={[styles.nViewStyle, {marginTop: 20, flexDirection: 'row', gap: 8,}]}>
                <Dropdown
                label="Employment Type"
                options={['Full Time', 'Part Time', 'Contract']}
                value={employmentType}
                onSelect={setEmploymentType}
                width={'50%'}
                selectText={'Select'}
                />

                <Dropdown
                label=""
                options={['Full Time', 'Part Time', 'Contract']}
                value={minExp}
                onSelect={setEmploymentType}
                width={'22.5%'}
                selectText={'Min'}
                />

                <Dropdown
                label=""
                options={['Full Time', 'Part Time', 'Contract']}
                value={maxExp}
                onSelect={setEmploymentType}
                width={'22.5%'}
                selectText={'Max'}
                />
            </View>

            <View style={[styles.nViewStyle,{marginTop: 25}]}>
                <TextInput
                multiline
                placeholder="Describe the responsibilities, qualifications, and benefits  for this position... "
                style={styles.bigTextInputStyle }
                placeholderTextColor={'#2a2727'}/>
            </View>

            <View>
                 <Dropdown
                label=""
                options={['Full Time', 'Part Time', 'Contract']}
                value={maxExp}
                onSelect={setEmploymentType}
                width={'90%'}
                selectText={'Job Templates'}
                marginHorizontal={20}
                />
            </View>

            <View style={styles.tipsView}>
                <Text style={styles.tipsText}>Tips</Text>

                <View style={styles.tipsLine}/>
                
                <View style= {styles.tipsSubText}>
                    <Text style={styles.dotStyle}>•</Text>
                    <Text>Use of clear and concise language</Text>
                </View>

                <View style= {[styles.tipsSubText, {marginTop: -10}]}>
                    <Text style={styles.dotStyle}>•</Text>
                    <Text>Highlight key responsibilities</Text>
                </View>

                <View style= {[styles.tipsSubText, {marginTop: -10}]}>
                    <Text style={styles.dotStyle}>•</Text>
                    <Text>Include required Qualifications</Text>
                </View>

                

                

            </View>
                <View style={styles.viewButton}>
                    <TouchableOpacity
                          onPress={() => {
                            router.back();
                          }}
                          style={[styles.touchableStyle,  ]}
                        >
                          <Text style={styles.touchableTextStyle}>Cancel</Text>
                        </TouchableOpacity>


                    <ButtonSample
                        backgroundColor={'#1348D5'}
                        width={'40%'}
                        text={'Post Job'}
                        height={'120%'} 
                        fontColor={'white'}
                        fontSize={16}
                        route={'./jobDescSuccess'}
                        
                    />
                </View>
                 </ScrollView>
        </SafeAreaView>

   

    )

}

export default CreateJobListing;


const styles = StyleSheet.create({

    viewStyle: {
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 10
    },
     nViewStyle: {
        paddingHorizontal: 20,
        gap: 10,
        marginTop: -7
    },


    headerTextStyle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#1348D5'
    },

    subTextStyle: {
        fontSize: 17,
        color: '#000000',
        fontWeight: '300'
    },

    labelStyle: {
        fontSize: 17,
        paddingHorizontal: 10,
        marginTop: 20
    },

    textInputStyle: { 
        borderWidth: 1,
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: -3
        
    },

    safeAreaView: {
        gap: 10
    },

    bigTextInputStyle: {
        borderWidth: 1,
        height: 150,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginTop: -3,
        fontSize: 12,
        paddingTop: 10,
        textAlignVertical: 'top',
        
    },

    tipsView: {
        backgroundColor: '#D9D9D9',
        height: 133,
        width: 380,
        alignSelf: 'center',
        borderRadius: 12,
        marginTop: 20
    },

    tipsText: {
        padding: 10,
        paddingLeft: 20
    },
    
    tipsLine: {
        height: 1,
        backgroundColor: 'black',
        marginHorizontal: 12
    },

    dotStyle: {
        fontSize: 30,
    },

    tipsSubText: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    viewButton: {
        marginTop: 15,
        flexDirection: 'row',
        paddingHorizontal: 20
    },

     touchableStyle: {
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: '#000000',
    height: '120%',
    width: '40%'
  },

  touchableTextStyle: {
    color: 'white'


  }
  
    



}) 




