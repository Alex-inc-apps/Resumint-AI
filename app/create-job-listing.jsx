import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Dropdown from "../components/dropdown";
import Header from "../components/header";







const CreateJobListing = () => {






const [jobTitle, setJobTitle] = useState('');
const [location, setLocation] = useState('');
const [companyName, setCompanyName] = useState('');
const [employmentType, setEmploymentType] = useState('');
const [minExp, setMinExp] = useState('');
const [maxExp, setMaxExp] = useState('');
const [jobDescription, setJobDescription] = useState('');
const [primarySkills, setPrimarySkills] = useState(''); 



const handlePostJob = async () => {
    try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
            alert("You must be logged in to post a job.");
            return;
        }

        const response = await axios.post(
            "https://automated-resume-screener-interview.onrender.com/api/recruiter/jobs",
            {
                jobTitle: jobTitle,
                companyName: companyName,
                primarySkills: primarySkills.split(',').map(skill => skill.trim()),
                jobDescription: jobDescription,
                salaryRange: {
                    min: Number(minExp),
                    max: Number(maxExp),
                },
                location: location,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        console.log(response.data);

        if (response.data?.success) {
            router.push('./jobDescSuccess');
        } else {
            alert(response.data?.message || "Failed to post job.");
        }
    } catch (error) {
        console.error(JSON.stringify(error.response?.data || error.message));
        alert(error.response?.data?.error || "Something went wrong.");
    }
};

    return(

         
        <SafeAreaView style={{flex: 1}} >

            <Header text={''}/>
           <ScrollView 
           style={{flex: 1}}
           contentContainerStyle={{padding: 20}}>

            

            <View style={[styles.viewStyle, {marginTop: -20}]}>
                
                <Text style={styles.headerTextStyle}>Create Job Listing</Text>
                <Text style={styles.subTextStyle}>Enter the job details on we can help you attract</Text>
                <Text style={[styles.subTextStyle, {marginTop: -10}]}>top talent</Text>
            </View>

            {/* Job Title text & TextInput */}
            <View style={styles.nViewStyle}>
                <Text style={styles.labelStyle}>Job Title</Text>
                <TextInput
                value={jobTitle}
                onChangeText={setJobTitle}
                placeholder="e.g Marketing Manager"
                placeholderTextColor={'#cbc6c6'}
                style={styles.textInputStyle }/>
            </View>

            <View style={styles.nViewStyle}>
                <Text style={styles.labelStyle}>Company Name</Text>
                <TextInput
                    placeholder="e.g Example Inc"
                    value={companyName}
                    onChangeText={setCompanyName}
                    style={styles.textInputStyle}/>
            </View>

            <View style={styles.nViewStyle}>
                <Text style={styles.labelStyle}>Skills (comma separated)</Text>
                <TextInput
                    placeholderTextColor={'#cbc6c6'}
                    placeholder="e.g React, Node.js, PostgreSQL"
                    value={primarySkills}
                    onChangeText={setPrimarySkills}
                    style={styles.textInputStyle}/>
                    
            </View>
            

             {/* Location text & TextInput */}
            <View style={styles.nViewStyle}>
                <Text style={styles.labelStyle}>Location</Text>
                <TextInput
                placeholderTextColor={'#cbc6c6'}
                value={location}
                onChangeText={setLocation}
                placeholder="e.g Enugu, Enugu"
                style={styles.textInputStyle }/>
                 
            </View>


            <View style={[styles.nViewStyle, {marginTop: 20, flexDirection: 'row', gap: 8, justifyContent: 'space-between', }]}>
                <Dropdown
                label="Employment Type"
                options={['Full Time', 'Part Time', 'Contract']}
                value={employmentType}
                onSelect={setEmploymentType}
                width={'50%'}
                selectText={'Select'}
                />
                <View style={{ width: '48%' }}>
                    <Text style={styles.salaryLabel}>Salary Range</Text>

                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TextInput
                    value={minExp}
                    onChangeText={setMinExp}
                    placeholder="Min"
                    keyboardType="numeric"
                    style={[styles.txtInput, { flex: 1 }]}
                />

                    <TextInput
                    value={maxExp}
                    onChangeText={setMaxExp}
                    placeholder="Max"
                    keyboardType="numeric"
                    style={[styles.txtInput, { flex: 0.6 }]}
                    />
                </View>
            </View>
            </View>

            <View style={[styles.nViewStyle,{marginTop: 25}]}>
                <TextInput
                value={jobDescription}
                onChangeText={setJobDescription}
                multiline
                placeholder="Describe the responsibilities, qualifications, and benefits  for this position... "
                style={styles.bigTextInputStyle }
                placeholderTextColor={'#2a2727'}/>
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


                    <TouchableOpacity
                        onPress={handlePostJob}
                        style={[styles.touchableStyle, { backgroundColor: '#1348D5' }]}
                    >
                        <Text style={styles.touchableTextStyle}>Post Job</Text>
                    </TouchableOpacity>
                        
                    
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
        fontSize: 16,
        color: '#000000',
        fontWeight: '300'
    },

    labelStyle: {
        fontSize: 17,
        paddingHorizontal: 10,
        marginTop: 20
    },

    salaryLabel: {
    fontSize: 17,
    paddingHorizontal: 2,
    marginBottom: 6,
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
    fontSize: 17,
    color: 'white',
    


  },

  txtInput: {height: 43,
             width: '23%',
             borderWidth: 1,
            borderRadius: 8,
            justifyContent: 'center',
            paddingHorizontal: 5
            
            }
  
    



}) 




