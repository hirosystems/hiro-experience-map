export const GITHUB_PROJECT_QUERY = `
  query($owner: String!, $projectNumber: Int!) {
    organization(login: $owner) {
      projectV2(number: $projectNumber) {
        fields(first: 20) {
          nodes {
            ... on ProjectV2Field {
              name
              dataType
            }
            ... on ProjectV2SingleSelectField {
              name
              dataType
              options {
                id
                name
                description
              }
            }
          }
        }
        items(first: 100) {
          nodes {
            content {
              ... on Issue {
                id
                title
                body
                state
                url
                createdAt
                updatedAt
                labels(first: 10) {
                  nodes {
                    name
                    color
                  }
                }
                projectItems(first: 1) {
                  nodes {
                    fieldValues(first: 10) {
                      nodes {
                        ... on ProjectV2ItemFieldTextValue {
                          field {
                            ... on ProjectV2Field {
                              name
                              dataType
                            }
                          }
                          text
                        }
                        ... on ProjectV2ItemFieldSingleSelectValue {
                          field {
                            ... on ProjectV2SingleSelectField {
                              name
                              dataType
                              options {
                                id
                                name
                              }
                            }
                          }
                          optionId
                        }
                        ... on ProjectV2ItemFieldNumberValue {
                          field {
                            ... on ProjectV2Field {
                              name
                              dataType
                            }
                          }
                          number
                        }
                        ... on ProjectV2ItemFieldDateValue {
                          field {
                            ... on ProjectV2Field {
                              name
                              dataType
                            }
                          }
                          date
                        }
                        ... on ProjectV2ItemFieldIterationValue {
                          field {
                            ... on ProjectV2Field {
                              name
                              dataType
                            }
                          }
                          iterationId
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`; 