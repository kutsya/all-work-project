import './AnimatedNumbers.css';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
// import { useEffect } from 'react';

const AnimatedNumbers = ({ value }) => {
    const props = useSpring({
        to: { number: value },
        from: { number: 0 },
        config: { duration: 2000 }
    });

    // useEffect(()=>{
    //     console.log(value)
    // }, [value])

    return (
        <animated.span>
            {/* eslint-disable-next-line react/prop-types */}
            {props.number.to((n) => Math.floor(n))}
        </animated.span>
    );
};

AnimatedNumbers.propTypes = {
    value: PropTypes.number.isRequired,
};

export default AnimatedNumbers;
