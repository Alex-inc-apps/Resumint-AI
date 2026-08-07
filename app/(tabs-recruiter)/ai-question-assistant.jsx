import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/header";

const AiQuestionAssistant = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [jobRole, setJobRole] = useState('');
    const [primarySkills, setPrimarySkills] = useState([]);
    const [interviewType, setInterviewType] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    // Part 2 fills this in
    const handleGenerate = async () => {};

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header text={''}/>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}>

                <Text style={styles.pageTitle}>AI Question Assistant</Text>

                <View style={styles.panelCard}>
                    <Text style={styles.panelTitle}>AI Question Generation Panel</Text>

                    <Text style={styles.label}>Job Role</Text>
                    <TextInput
                        placeholder="e.g Software Engineer"
                        value={jobRole}
                        onChangeText={setJobRole}
                        style={styles.input}
                        editable={false} // auto-filled once a job is selected — see note below
                    />

                    <Text style={styles.label}>Primary Skills</Text>
                    <View style={styles.chipContainer}>
                        {primarySkills.map((skill, i) => (
                            <View key={i} style={styles.chip}>
                                <Text style={styles.chipText}>{skill}</Text>
                            </View>
                        ))}
                        {primarySkills.length === 0 && (
                            <Text style={{ color: '#999', fontStyle: 'italic', padding: 8 }}>more....</Text>
                        )}
                    </View>

                    <Text style={styles.label}>Interview Type</Text>
                    <TextInput
                        placeholder="e.g Technical Deep Dive"
                        value={interviewType}
                        onChangeText={setInterviewType}
                        style={styles.input}
                    />

                    <TouchableOpacity style={styles.generateButton} onPress={handleGenerate} disabled={loading}>
                        <Text style={styles.generateButtonText}>
                            {loading ? 'Generating...' : 'Generate AI Questions'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {questions.length > 0 && (
                    <View style={styles.panelCard}>
                        <Text style={styles.panelTitle}>AI Generated Question Suggestion</Text>

                        {questions.map((q, index) => (
                            <View key={q.id || index} style={styles.questionRow}>
                                <Text style={styles.questionText}>• {q.question}</Text>
                                <View style={styles.questionActions}>
                                    <TouchableOpacity style={styles.assignButton}>
                                        <Text style={styles.assignButtonText}>Assign To Candidate</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.editButton}>
                                        <Text style={styles.editButtonText}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}

                        <TouchableOpacity onPress={handleGenerate}>
                            <Text style={styles.generateMoreText}>Generate more questions</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>
    );
};

export default AiQuestionAssistant;

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#fff' },
    pageTitle: { fontSize: 26, fontWeight: 'bold', color: '#1348D5', marginTop: 10, marginBottom: 16 },

    panelCard: { backgroundColor: '#F5F5F5', borderRadius: 14, padding: 16, marginBottom: 20 },
    panelTitle: { fontSize: 17, fontWeight: '600', marginBottom: 14 },

    label: { fontSize: 14, color: '#333', marginBottom: 6, marginTop: 10 },
    input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, height: 44, paddingHorizontal: 12 },

    chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, minHeight: 80 },
    chip: { backgroundColor: '#ddd', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 12 },
    chipText: { fontSize: 13 },

    generateButton: { backgroundColor: '#1348D5', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 18 },
    generateButtonText: { color: 'white', fontWeight: '600', fontSize: 15 },

    questionRow: { borderBottomWidth: 1, borderBottomColor: '#e0e0e0', paddingVertical: 12 },
    questionText: { fontSize: 14, marginBottom: 10 },
    questionActions: { flexDirection: 'row', gap: 10 },
    assignButton: { backgroundColor: '#1348D5', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 14 },
    assignButtonText: { color: 'white', fontSize: 12, fontWeight: '600' },
    editButton: { borderWidth: 1, borderColor: '#999', borderRadius: 16, paddingVertical: 6, paddingHorizontal: 14 },
    editButtonText: { fontSize: 12 },

    generateMoreText: { color: '#1348D5', textDecorationLine: 'underline', marginTop: 12, fontSize: 14 },
});