import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";

// Dummy data — replace once backend adds a candidates endpoint
const candidates = [
    { id: 1, name: 'Tegah Sarah', role: 'Frontend Development', score: 95, status: 'Shortlisted', action: 'Hire' },
    { id: 2, name: 'Ojo Simi', role: 'Frontend Development', score: 92, status: 'Shortlisted', action: 'Hire' },
    { id: 3, name: 'Sam Zite', role: 'Frontend Development', score: 85, status: 'Interviewed', action: 'Pending Review' },
];

const Dashboard = () => {
    const [search, setSearch] = useState('');
    const [activeJobs, setActiveJobs] = useState(0); // filled in Part 2


  useEffect(() => {
    const fetchJobs = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(
                "https://automated-resume-screener-interview.onrender.com/api/recruiter/jobs",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("JOBS RESPONSE:", JSON.stringify(response.data));

            setActiveJobs(response.data.jobs?.length || 0);
        } catch (error) {
            console.error(JSON.stringify(error.response?.data || error.message));
        }
    };

    fetchJobs();
}, []);

    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>

          <Header text={'Dashboard'}/>
            <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>

                {/* Top bar: menu icon, search, avatar */}
                <View style={styles.topBar}>
                    <Ionicons name="list" size={26} color="black" />
                    <View style={styles.searchBox}>
                        <Ionicons name="search" size={18} color="#888" />
                        <TextInput
                            placeholder="Search candidates"
                            value={search}
                            onChangeText={setSearch}
                            style={styles.searchInput}
                        />
                    </View>

                     // profile pic
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/100' }}
                        style={styles.avatar}
                    />
                </View>

                {/* Welcome */}
                <Text style={styles.welcomeText}>Welcome Back John!</Text>
                <Text style={styles.subText}>Here's whats happening with....</Text>

                <Text style={styles.sectionTitle}>Recruiter Dashboard</Text>

                {/* Stat cards row */}
                <View style={styles.statsRow}>
                    <View style={[styles.statCard, { flex: 1 }]}>
                        <Text style={styles.statLabel}>Active job listing</Text>
                        <Text style={styles.statValue}>{activeJobs} Open</Text>
                        
                        {/* bar chart placeholder — static image/shape for now */}
                        <View style={styles.fakeBarChart}>
                            {[40, 60, 30, 70, 50, 65].map((h, i) => (
                                <View key={i} style={[styles.fakeBar, { height: h }]} />
                            ))}
                        </View>
                    </View>

                    <View style={{ flex: 1, gap: 10 }}>
                        <View style={styles.statCardSmall}>
                            <Text style={styles.statLabel}>Total Applicants</Text>
                            <Text style={styles.statValue}>0</Text>
                            <Text style={styles.statSubLabel}>This week</Text>
                        </View>
                        <View style={styles.statCardSmall}>
                            <Text style={styles.statLabel}>Shortlisted Candidates</Text>
                            <Text style={styles.statValue}>0</Text>
                            <Text style={styles.statSubLabel}>0 lists</Text>
                        </View>
                    </View>
                </View>

                {/* Hiring pipeline */}
                <View style={styles.pipelineCard}>
                    <Text style={styles.pipelineTitle}>Hiring Pipeline</Text>
                    <View style={[styles.pipelineBar, { width: '0%' }]}><Text style={styles.pipelineText}>Applied (0)</Text></View>
                    <View style={[styles.pipelineBar, { width: '0%' }]}><Text style={styles.pipelineText}>Screening (0)</Text></View>
                    <View style={[styles.pipelineBar, { width: '0%' }]}><Text style={styles.pipelineText}>Interview (0)</Text></View>
                </View>

                {/* Candidate list */}
                <View style={styles.candidatesSection}>
                    <Text style={styles.candidatesTitle}>Total candidates</Text>
                    {candidates.map((c, index) => (
                        <View key={c.id} style={styles.candidateCard}>
                            <Text style={styles.rankNumber}>{index + 1}</Text>
                            <Image source={{ uri: 'https://i.pravatar.cc/100?img=' + c.id }} style={styles.candidateAvatar} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.candidateName}>{c.name}</Text>
                                <Text style={styles.candidateRole}>{c.role}</Text>
                                <View style={[styles.badge, c.status === 'Shortlisted' ? styles.badgeBlue : styles.badgeDark]}>
                                    <Text style={styles.badgeText}>{c.status}</Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end', gap: 8 }}>
                                <Text style={styles.candidateScore}>{c.score}</Text>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.actionButtonText}>{c.action}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    safeAreaViewStyle: { 
      flex: 1, 
      backgroundColor: '#fff', 
      paddingHorizontal: 16 
        },

    topBar: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      gap: 10, 
      marginTop: 10 
        },

    searchBox: { 
      flex: 1, 
      flexDirection: 'row', 
      alignItems: 'center', 
      backgroundColor: '#f0f0f0', 
      borderRadius: 8, 
      paddingHorizontal: 10, 
      height: 38 
    },

    searchInput: 
    { flex: 1, 
      marginLeft: 6 
    },

    avatar: {
       width: 36, 
       height: 36, 
       borderRadius: 18 
      },

    welcomeText: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      color: '#1348D5', 
      marginTop: 16 
    },
    subText: { 
      fontSize: 14, 
      color: '#555'
     },
     
    sectionTitle: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      color: '#1348D5',
      marginTop: 16, 
      marginBottom: 10 
      },


    statsRow: {
       flexDirection: 'row', 
       gap: 10 
      },

    statCard: { 
      backgroundColor: '#fff', 
      borderWidth: 1, 
      borderColor: '#1348D5', 
      borderRadius: 12, 
      padding: 12, 
      minHeight: 150 
    },

    statCardSmall: { 
      backgroundColor: '#fff', 
      borderWidth: 1, 
      borderColor: '#1348D5', 
      borderRadius: 12, 
      padding: 12 
    },

    statLabel: { 
      fontSize: 13, 
      color: '#333' 
    },

    statValue: { 
      fontSize: 20, 
      fontWeight: 'bold', 
      marginTop: 4 
    },

    statSubLabel: { 
      fontSize: 12, 
      color: '#888' 
    },

    fakeBarChart: { 
      flexDirection: 'row', 
      alignItems: 'flex-end', 
      gap: 4,
      marginTop: 10, 
      height: 70
     },

    fakeBar: { 
      width: 10, 
      backgroundColor: '#1348D5', 
      borderRadius: 2 
    },

    pipelineCard: { 
      borderWidth: 1, 
      borderColor: '#1348D5', 
      borderRadius: 12, 
      padding: 14, 
      marginTop: 16, 
      gap: 10

    },

    pipelineTitle: { 
      fontSize: 16, 
      fontWeight: '600', 
      marginBottom: 6 
    },

    pipelineBar: { 
      backgroundColor: '#B34CE0', 
      borderRadius: 20, 
      paddingVertical: 8, 
      paddingHorizontal: 12 
    },

    pipelineText: { 
      color: 'white', 
      fontWeight: '600' 
    },

    candidatesSection: { 
      backgroundColor: '#eee', 
      borderRadius: 12, 
      padding: 14, 
      marginTop: 16
     },
    candidatesTitle: { 
      fontSize: 18, 
      fontWeight: 'bold',
       marginBottom: 10 
      },
    candidateCard: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      backgroundColor: '#fff', 
      borderRadius: 10, 
      padding: 10, 
      marginBottom: 10, 
      gap: 10 },

      
    rankNumber: { fontWeight: 'bold' },
    candidateAvatar: {
       width: 44,
       height: 44, 
       borderRadius: 22 
      },

    candidateName: { 
      fontWeight: '600', 
      fontSize: 15 
    },


    candidateRole: {
      fontSize: 12, 
      color: '#777'
     },

    candidateScore: { 
      fontWeight: 'bold', 
      fontSize: 16 
    },


    badge: { 
      alignSelf: 'flex-start', 
      borderRadius: 12, 
      paddingHorizontal: 8, 
      paddingVertical: 2, 
      marginTop: 4 
    },


    badgeBlue: { 
      backgroundColor: '#1348D5'
     },
    badgeDark: { 
      backgroundColor: '#1E1E1E'
     },

    badgeText: { 
      color: 'white', 
      fontSize: 11 
    },
    actionButton: { 
      borderWidth: 1, 
      borderColor: '#ccc', 
      borderRadius: 8, 
      paddingHorizontal: 10, 
      paddingVertical: 4 
    },
    actionButtonText: { 
      fontSize: 12
     },
});