export default {
  components: {
    Input: {
      sizes: {},
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: '#3498db',
              boxShadow: '0 0 0 1px black'
            },
            _invalid: {
              borderColor: '#D12E2E !important',
              boxShadow: '0 0 0 1px #D12E2E !important'
            }
          }
        }
      }
    },
    Select: {
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: '#3498db',
            },
          },
        },
      },
    },
    Button: {
      sizes: {},
      variants: {
        solid: {
          bg: 'blue.500',
          fontWeight: 'medium',
          color: 'white',
          _focus: {
            bg: 'blue.400'
          },
          _focusWithin: {
            bg: 'blue.500'
          },
          _active: {
            bg: 'blue.400'
          },
          _hover: {
            bg: 'blue.400'
          }
        },
        outline: {
          color: 'blue.500',
          borderColor: 'blue.500',
          _focus: {
            bg: 'blue.500',
            color: 'white'
          },
          _focusWithin: {
            bg: 'blue.500',
            color: 'white'
          },
          _active: {
            bg: 'blue.500',
            color: 'white'
          },
          _hover: {
            bg: 'blue.500',
            color: 'white'
          }
        },
        gray: {
          border: '2px',
          fontWeight: 'medium',
          borderColor: 'gray.700',
          color: 'gray.700',
          _focus: {
            color: 'white',
            bg: 'gray.700'
          },
          _focusWithin: {
            color: 'white',
            bg: 'gray.700'
          },
          _active: {
            color: 'white',
            bg: 'gray.700'
          },
          _hover: {
            color: 'white',
            bg: 'gray.700'
          }
        }
      }
    },
    IconButton: {
      sizes: {},
      variants: {
        outline: {
          color: 'white',
          bg: 'blue.500',
          _focus: {
            bg: 'blue.400'
          },
          _focusWithin: {
            bg: 'blue.500'
          },
          _active: {
            bg: 'blue.400'
          },
          _hover: {
            bg: 'blue.400'
          }
        }
      }
    },
    Modal: {
      variants: {
        big: {
          dialog: {
            maxW: 'var(--chakra-sizes-3xl)'
          }
        },
        huge: {
          dialog: {
            maxW: 'var(--chakra-sizes-5xl)'
          }
        }
      }
    }
  }
};
