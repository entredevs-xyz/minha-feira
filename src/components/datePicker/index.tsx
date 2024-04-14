import { useAppTheme } from '@/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { useStyles } from './styles';


interface DatePickerProps {
    showDate: boolean;
    date: Date;
    onChange: (date?: Date | undefined) => void;

}
const DatePicker: React.FC<DatePickerProps> = ({
    date,
    onChange,
    showDate
}) => {

    const { colors } = useAppTheme()
    const styles = useStyles()
    const isAndroid = Platform.OS === 'android'

    const handlerOnChange = (date?: Date) => {
        if (onChange)
            onChange(date)
    }

    if (!isAndroid)
        return <Portal>
            <Modal
                visible={showDate}
                onDismiss={() => handlerOnChange(date)}
                contentContainerStyle={styles.dateModalStyle}
            >
                {showDate && <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    style={{
                        backgroundColor: colors.secondaryColor,
                        zIndex: 1000,
                    }}
                    textColor={colors.primaryColor}
                    accentColor={colors.primaryColor}
                    display='inline'
                    onChange={(_, date) => handlerOnChange(date)}
                />}
            </Modal>
        </Portal>

    return showDate && <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={"date"}
        style={{
            backgroundColor: colors.secondaryColor,
            zIndex: 1000,
        }}
        accentColor={colors.secondaryColor}
        display='inline'
        onChange={(_, date) => handlerOnChange(date)}
    />


}

export default DatePicker


