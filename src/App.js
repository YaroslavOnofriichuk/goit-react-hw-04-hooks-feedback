import React, { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';
import Notification from './Notification/Notification';

function App () {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const onLeaveFeedback = e => {
        const key = e.target.outerText.toLowerCase();

        switch (key) {
            case "good":
                setGood(good + 1);
              break;
          
            case "neutral":
                setNeutral(neutral + 1);
              break;

            case "bad":
                setBad(bad + 1);
              break;
          
            default:
              return;
          };
    };

    const countTotalFeedback = () => {
        return good + neutral + bad;
    };

    const countPositiveFeedbackPercentage = () => {
        let value = (good * 100) / countTotalFeedback();
        value = value.toFixed(0);
        return value;
    };

    const options = ["good", "neutral", "bad"];

        return (
            <>
                <Section title="Please leave feedback">
                    <FeedbackOptions
                        options={options}
                        onLeaveFeedback={onLeaveFeedback}
                    />
                </Section>
                <Section title="Statistics">
                    {countTotalFeedback() > 0 ? (
                        <Statistics
                            good={good}
                            neutral={neutral}
                            bad={bad}
                            total={countTotalFeedback()}
                            positivePercentage={
                                countPositiveFeedbackPercentage() > 0
                                    ? countPositiveFeedbackPercentage()
                                    : 0
                            }
                        />
                    ) : (
                        <Notification message="There is no feedback" />
                    )}
                </Section>
            </>
        );
}

export default App;
