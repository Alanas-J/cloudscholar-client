import styles from '../Home.module.css'
import Class from './class/Class'

function TodaysClassesDisplay() {
    return (
        <div className={styles.display + " mt-4 border border-secondary bg-light"}>
                <Class colour='#222288' classType='Lab' time='24h' subject='Fourth Year Project' />
                <Class colour='#AA553A' classType='Lecture' time='24/2/22' subject='Another Module Placeholder' />


        </div>
    );
}   

export default TodaysClassesDisplay;