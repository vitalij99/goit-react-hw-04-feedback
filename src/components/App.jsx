import { useState } from 'react';
import { FeedBackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { Section } from './section/Section';
import { Statistics } from './Statistics/Statistics';

export const App = () => {
    const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });
    const { good, neutral, bad } = feedback;
    const countTotalFeedback = () => good + neutral + bad;
    let total = countTotalFeedback();
    const onLeaveFeedback = option => {
        setFeedback(prevState => ({
            ...prevState,
            [option]: prevState[option] + 1,
        }));
    };
    const positiveFeedback = () => {
        const percentage = (good * 100) / total;
        return Math.round(percentage);
    };

    return (
        <>
            <Section title="Please leave feedback">
                <FeedBackOptions
                    options={Object.keys(feedback)}
                    onLeaveFeedback={onLeaveFeedback}
                ></FeedBackOptions>
            </Section>

            <Section title="Statistics">
                {total === 0 ? (
                    <Notification message="There is no feedback" />
                ) : (
                    <Statistics
                        good={good}
                        neutral={neutral}
                        bad={bad}
                        total={total}
                        positivePercentage={positiveFeedback()}
                    ></Statistics>
                )}
            </Section>
        </>
    );
};
