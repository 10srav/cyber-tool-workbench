
interface ToolResult {
  success: boolean;
  data: any;
  error?: string;
}

export const mockToolExecution = async (toolId: string, target: string): Promise<ToolResult> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  switch (toolId) {
    case 'endpoint_hunter':
      return {
        success: true,
        data: [
          `https://${target}/api/v1/users`,
          `https://${target}/api/v1/products`,
          `https://${target}/login`,
          `https://${target}/signup`,
          `https://api.${target}/graphql`
        ]
      };

    case 'sql':
      return {
        success: true,
        data: [
          {
            url: target,
            vulnerable: Math.random() > 0.5,
            payloads: ["' OR '1'='1", "' UNION SELECT * FROM users--"],
            evidence: "SQL syntax detected in URL parameters"
          }
        ]
      };

    case 'subs_extractor':
    case 'subdomain_extractor':
      return {
        success: true,
        data: [
          `admin.${target}`,
          `api.${target}`,
          `dev.${target}`,
          `stage.${target}`,
          `test.${target}`
        ]
      };
      
    case 'social_finder':
      return {
        success: true,
        data: [
          {
            platform: "Twitter",
            username: target,
            url: `https://twitter.com/${target}`,
            followers: Math.floor(Math.random() * 10000)
          },
          {
            platform: "Instagram",
            username: target,
            url: `https://instagram.com/${target}`,
            followers: Math.floor(Math.random() * 5000)
          },
          {
            platform: "GitHub",
            username: target,
            url: `https://github.com/${target}`,
            repos: Math.floor(Math.random() * 50)
          }
        ]
      };

    default:
      return {
        success: false,
        data: null,
        error: 'Tool not implemented or unavailable'
      };
  }
};
