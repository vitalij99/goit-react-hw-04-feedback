import { Component } from "react";
import { FeedBackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Notification } from "./Notification/Notification";
import { Section } from "./section/Section";
import { Statistics } from "./Statistics/Statistics";

export class App extends Component {
  state = {
		good: 0,
		neutral: 0,
		bad: 0
  };
  
  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  }
  onLeaveFeedback= option => {
    this.setState(state => ({
			[option]: state[option] + 1,
		}));
  }
  positiveFeedback = () => {
     const result = this.countTotalFeedback();
		const { good } = this.state;
		const percentage = (good * 100) / result;
		return Math.round(percentage);
  }
  render() {
    const { good, neutral, bad } = this.state
    const total = good+ neutral+ bad
    const data = Object.keys(this.state);
    const positivePercentage = this.positiveFeedback();

    return (
      <>
        <Section title="Please leave feedback">
          <FeedBackOptions options={data} onLeaveFeedback={this.onLeaveFeedback}></FeedBackOptions>
        </Section>
       
        <Section title="Statistics">
          {total === 0 ? (
            <Notification message="There is no feedback"/>
          )
            : <Statistics good={good} neutral={neutral} bad={bad} total={total} positivePercentage={positivePercentage}></Statistics>
          }           
        </Section>
      </>
      )
  }
};
export default App