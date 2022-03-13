import React, { Component, useEffect, useState } from 'react';
import FeedbackOptions from './FeedbackOptions';
import Section from './Section';
import Statistics from './Statistics';
import Notification from './Notofication';
import styled from '@emotion/styled';

const labels = ['Good', 'Neutral', 'Bad'];

const Fancy = styled.div({
  textAlign: 'left',
});

function FeedbackStats(props) {
  const [good, addGood] = useState(0);
  const [neutral, addNeutral] = useState(0);
  const [bad, addBad] = useState(0);
  const [total, countTotal] = useState(0);
  const [positive, countPositive] = useState(0);

  const handleClick = label => {
    label === 'Good' && addGood(good + 1);
    label === 'Neutral' && addNeutral(neutral + 1);
    label === 'Bad' && addBad(bad + 1);
  };

  useEffect(() => {
    countTotal(good + neutral + bad);
    countPositive((good * 100) / total);
  });

  return total === 0 ? (
    <div>
      <Fancy>
        <Section title="Please leave feedback" />
        <FeedbackOptions options={labels} onLeaveFeedback={handleClick} />
        <Section title="Statistics" />
        <Notification message="There is no feedback" />
      </Fancy>
    </div>
  ) : (
    <div>
      <Fancy>
        <Section title="Please leave feedback" />
        <FeedbackOptions options={labels} onLeaveFeedback={handleClick} />
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={positive}
        ></Statistics>
      </Fancy>
    </div>
  );
}

export default FeedbackStats;
