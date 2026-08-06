import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Dropdown = ({ label, options, value, onSelect, width, selectText, marginHorizontal }) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={[styles.nViewStyle, { width }]}>
        <Text style={styles.labelStyle}>{label}</Text>

        <TouchableOpacity style={[styles.dropdownBox, { width: '100%', marginHorizontal: marginHorizontal }]} onPress={() => setOpen(!open)}>
            <Text style={styles.dropdownText}>{value || selectText}</Text>
            <Text>{open ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {open && (
            <View style={[styles.dropdownList, { width: '100%', marginHorizontal: marginHorizontal, position: 'static'}]}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={styles.dropdownItem}
                            onPress={() => {
                                onSelect(option);
                                setOpen(false);
                            }}
                        >
                            <Text>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default Dropdown;

const styles = StyleSheet.create({
    nViewStyle: {
        marginBottom: 4,
    },
    labelStyle: {
        fontSize: 16,
        marginBottom: 4,
        paddingHorizontal: 10
    },
    dropdownText: {
        fontSize: 14,
    },
    dropdownBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
    },
    dropdownList: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginTop: 4,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});