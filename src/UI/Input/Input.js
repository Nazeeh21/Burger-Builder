import React from 'react';
import classes from './Input.css'

const input = props => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let validationError  = null;

    if(props.inValid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.elementConfig.type}</p>
    }

    switch(props.elementType) {
        case('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />
            break;
        case('textarea'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />
            break;
        case('select'):
            inputElement = (<select>
                className={inputClasses.join(' ')}
                value={props.value}
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}
                        onChange={props.changed}>
                        {option.displayValue}
                    </option>
                ))}
            </select>)
            break;
        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />
    }


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;