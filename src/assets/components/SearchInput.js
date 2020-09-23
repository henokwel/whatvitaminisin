import React from 'react'
// import searchIcon from '../Icons/search.svg'
import * as Autosuggest from "react-autosuggest";

import AutosuggestHighlightMatch from "autosuggest-highlight/umd/match";
import AutosuggestHighlightParse from "autosuggest-highlight/umd/parse";
import { foodSuggestions } from '../../ListOfFood';


// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return foodSuggestions.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion, { query }) {
    const matches = AutosuggestHighlightMatch(suggestion.name, query);
    const parts = AutosuggestHighlightParse(suggestion.name, matches);

    return (
        <span>
            {parts.map((part, index) => {
                const className = part.highlight ? 'react-autosuggest__suggestion-match' : null;

                return (
                    <span className={className} key={index}>
                        {part.text}
                    </span>
                );
            })}
        </span>
    );
}

class SearchInput extends React.Component {
    constructor() {
        super();
        this.state = { value: '', suggestions: [] };
        this.handleSubmit = this.handleSubmit.bind(this)
     }

    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    handleSubmit(e) {
        e.preventDefault()
        // if input is empty, return nothing
        if (this.state.value.trim() === "") return

        this.props.getUserInput(this.state.value)
        this.setState({ value: "" })


    }
    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Search food item . .",
            value,
            onChange: this.onChange
        };

        return (
            <form onSubmit={this.handleSubmit}>

                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}

                />

                {/* <input type="submit"  className="searchBtn" / > */}
                <button className="searchBtn">
                    {/* <img src={searchIcon}  width="50%"  alt="search icon btn" /> */}
                    <i className="fas fa-search"></i>
                </button>
            </form>
        );
    }
}

export default SearchInput;