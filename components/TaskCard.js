import { Pressable, StyleSheet, Text, View } from 'react-native';

const colors = {
    teal: '#0F766E',
    gray: '#6B7280',
    red: '#B23A48',
    lightBg: '#EEF2F8',
};

export default function TaskCard({ title, done, onToggle, onDelete }) {

    return (

        <View style={styles.card}>
            <Pressable onPress={onToggle} style={styles.left}>
                <Text style={{ color: done ? colors.teal : colors.gray, fontSize: 22 }}>{done ? '✓' : '○'}</Text>
                <Text style={styles.title}>{title}</Text>
            </Pressable>
            <Pressable onPress={onDelete}>
                <Text style={{ color: colors.red, fontSize: 20 }}>🗑</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({

card: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
padding: 12,
marginVertical: 6,
backgroundColor: colors.lightBg,
borderRadius: 8,
},

left: { flexDirection: 'row', alignItems: 'center', gap: 8 },
title: { fontWeight: 'bold', fontSize: 16 },

});