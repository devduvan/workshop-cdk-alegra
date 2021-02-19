export function getCdkPropsFromCustomProps(props: any) {
  return {
    stackName: props.name,
    env: {
      account: props.account,
      region: props.region,
    },
  };
}

export function getResourceNameWithPrefix(resourceName: string) {
  return `alegra-soccer-team-${resourceName}`;
}
