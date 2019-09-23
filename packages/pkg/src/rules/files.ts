import { ArrayExpression, ObjectProperty, StringLiteral } from '@babel/types'

const process = (props: ObjectProperty[]) => {
  const filesIndex = props.findIndex(prop => prop.key.value === 'files')

  if (filesIndex >= 0) {
    const [filesNode] = props.splice(filesIndex, 1)

    let readme: StringLiteral
    let license: StringLiteral
    let elements = (filesNode.value as ArrayExpression)
      .elements as StringLiteral[]

    elements = elements
      .filter(node => {
        const value = node.value.toLowerCase()

        // remove LICENSE and README and add to the end later on
        if (value === 'license') {
          license = node
          return false
        }

        if (value === 'readme' || value === 'readme.md') {
          readme = node
          return false
        }

        return true
      })
      .sort((a, b) => (a.value > b.value ? 1 : a.value < b.value ? -1 : 0))

    if (readme) {
      elements.push(readme)
    }

    if (license) {
      elements.push(license)
    }

    ;(filesNode.value as ArrayExpression).elements = elements

    props.splice(filesIndex, 0, filesNode)
  }

  return props
}

export { process as files }
