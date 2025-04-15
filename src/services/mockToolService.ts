
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
          'https://example.com/api/v1/users',
          'https://example.com/api/v1/products',
          'https://example.com/login',
          'https://example.com/signup',
          'https://api.example.com/graphql'
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

    default:
      return {
        success: false,
        error: 'Tool not implemented'
      };
  }
};
