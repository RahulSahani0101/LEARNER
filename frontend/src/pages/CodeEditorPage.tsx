import { useState } from "react";
import Editor from "@monaco-editor/react";
import { SectionHeader } from "../components/common/SectionHeader";

const challengeTemplates: Array<{ title: string; starter: string; hint: string }> = [
  {
    title: "Two Sum",
    starter: `import java.util.*;\n\npublic class Solution {\n  public static int[] twoSum(int[] nums, int target) {\n    // TODO: Implement HashMap based solution\n    return new int[] {-1, -1};\n  }\n\n  public static void main(String[] args) {\n    int[] ans = twoSum(new int[]{2, 7, 11, 15}, 9);\n    System.out.println(Arrays.toString(ans));\n  }\n}`,
    hint: "Use HashMap<value, index>, check complement before insert.",
  },
  {
    title: "Spring Boot Service Layer",
    starter: `@Service\npublic class UserService {\n  private final UserRepository userRepository;\n\n  public UserService(UserRepository userRepository) {\n    this.userRepository = userRepository;\n  }\n\n  public UserDto findByEmail(String email) {\n    // TODO: Return mapped DTO and throw domain exception if missing\n    return null;\n  }\n}`,
    hint: "Use Optional.orElseThrow and centralized exception handler.",
  },
  {
    title: "SQL Query Optimization Notes",
    starter: `-- Problem: Order history query is slow for large users\nSELECT o.id, o.created_at, oi.product_id, oi.quantity\nFROM orders o\nJOIN order_items oi ON o.id = oi.order_id\nWHERE o.user_id = ?\nORDER BY o.created_at DESC\nLIMIT 50;\n\n-- TODO: Add index strategy and explain plan notes`,
    hint: "Consider composite index on orders(user_id, created_at desc).",
  },
];

/**
 * Browser IDE page for Java coding drills.
 */
export function CodeEditorPage() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const activeChallenge = challengeTemplates[challengeIndex];

  return (
    <div className="space-y-4">
      <SectionHeader title="Java Code Lab" description="Practice production-like coding with clean function and test-first mindset." />
      <article className="glass-card rounded-2xl p-4">
        <h3 className="font-heading text-lg font-semibold">Challenge Picker</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {challengeTemplates.map((item, index) => (
            <button
              key={item.title}
              onClick={() => setChallengeIndex(index)}
              className={`rounded-lg px-3 py-1.5 text-sm ${index === challengeIndex ? "bg-brand-cyan/20 text-brand-text" : "bg-white/5 text-brand-muted hover:bg-white/10"}`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-brand-muted">Hint: {activeChallenge.hint}</p>
      </article>

      <article className="glass-card rounded-2xl p-2">
        <Editor
          key={activeChallenge.title}
          height="68vh"
          defaultLanguage="java"
          defaultValue={activeChallenge.starter}
          theme="vs-dark"
          options={{ fontSize: 14, minimap: { enabled: false }, fontFamily: "JetBrains Mono" }}
        />
      </article>
    </div>
  );
}
