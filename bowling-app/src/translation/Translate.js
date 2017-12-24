/* ###*
 *  Helper handling Translation system
 *
 *  @author WE_ARE
### */

/* eslint react/prefer-stateless-function: "off" */
/* Because stateless functions don't have context it seems */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Polyglot from 'node-polyglot';

// FIND BETTER WAY TO LOAD EVERY LOCALE
/* eslint-disable camelcase */
import en from './locale/en';
import en_CA from './locale/en_CA';
import en_US from './locale/en_US';
import fr from './locale/fr';
import fr_CA from './locale/fr_CA';
/* eslint-enable camelcase */

const languages = { en, en_CA, en_US, fr, fr_CA };

// warning can use config array because the order is really important for locale detection!
const acceptLanguages = ['en-US', 'en-CA', 'en', 'fr-CA', 'fr'];
const dropDownValues = [
  { value: 'en', label: 'en' },
  { value: 'en-CA', label: 'en (CA)' },
  { value: 'en-US', label: 'en (US)' },
  { value: 'fr', label: 'fr' },
  { value: 'fr-CA', label: 'fr (CA)' },
];

/* ####
 * Helper function return the current language value instead of dealing with this in every page.
 * @params {object} value - raw value of specific key
#### */
function cleanApiVal(value) {
  // add fallback to INT language
  // if no en-CA -> en
  // if no en-US -> en
  // if no fr-CA -> fr
  const locale = Cookies.get('locale');
  let altLocale = String(locale).split('-')[0];
  if (!acceptLanguages.includes(altLocale)) {
    altLocale = false;
  }

  if (value[locale]) {
    return value[locale];
  } else if (altLocale && value[altLocale]) {
    return value[altLocale];
  }

  return false;
}

/* ####
 * HOC add translation strings for given page
 * @params {string} key - key used to get json data
#### */
function translate(key) {
  return Component => {
    const stateToProps = state => ({
      currentLanguage: state.lang.locale,
    });

    class TranslationComponent extends React.Component {
      static propTypes = {
        strings: PropTypes.object,
        currentLanguage: PropTypes.string
      };

      static defaultProps = {
        currentLanguage: Cookies.get('locale'),
        strings: {}
      };

      render() {
        const translator = new Polyglot();

        let strings = languages[String(this.props.currentLanguage).replace('-', '_')][key];
        if (!strings) {
          strings = languages[String(this.props.currentLanguage).split('-')[0]][key];
        }

        const merged = {
          ...this.props.strings,
          ...strings
        };
        merged.Router = languages[String(this.props.currentLanguage).replace('-', '_')].Router;
        if (!merged.Router) {
          merged.Router = languages[String(this.props.currentLanguage).split('-')[0]].Router;
        }

        translator.extend(merged);

        if (merged) {
          return (
            <Component
              {...this.props}
              strings={merged}
              translator={translator}
              currentLanguage={this.props.currentLanguage}
            />
          );
        }

        return (
          <Component
            {...this.props}
            currentLanguage={this.props.currentLanguage}
          />
        );
      }
    }

    return connect(stateToProps)(TranslationComponent);
  };
}

/* ####
 * Helper function return translated Routes (for router)
 * @params {string} locale - desired locale
#### */
function getTranslatedRoutes(locale) {
  let strings = languages[String(locale).replace('-', '_')].Router;
  if (!strings) {
    strings = languages[String(locale).split('-')[0]].Router;
  }

  return strings;
}

/* ####
 * Helper function return translated form message (for validation)
 * @params {string} locale - desired locale
#### */
function getTranslatedForm(locale) {
  let strings = languages[String(locale).replace('-', '_')].Form;
  if (!strings) {
    strings = languages[String(locale).split('-')[0]].Form;
  }

  return strings;
}

export {
  acceptLanguages,
  dropDownValues,
  cleanApiVal,
  translate,
  getTranslatedRoutes,
  getTranslatedForm };
