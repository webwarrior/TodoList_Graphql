import { StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';
//const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 20,
        padding: 10
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    taskItem: {
        marginBottom: 10,
        textAlign: 'left',
        width: 400,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    taskText:  {
        marginBottom: 10,
        borderWidth:1,
        borderColor: 'grey', 
        backgroundColor: 'lightgrey', 
        height: 50, 
        flex: 1, 
        padding: 5,
        borderTopLeftRadius: 5, 
        borderBottomLeftRadius: 5,
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 18,
        width: 400
    },
    headerBackground: {
        paddingBottom: 40,
        paddingTop: 96,
        paddingHorizontal: 32,
        backgroundColor: Colors.lighter,
    },
    headerLogo: {
        opacity: 0.2,
        overflow: 'visible',
        resizeMode: 'cover',
        marginLeft: 0,
        marginBottom: 0,
    },
    headerText: {
        fontSize: 40,
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.black,
    },
    taskContainer: {
        flexDirection:'row', 
        marginHorizontal: 20,
        width: 300
      },
});    