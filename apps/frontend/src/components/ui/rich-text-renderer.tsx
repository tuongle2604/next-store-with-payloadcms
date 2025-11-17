import React from "react";

type Node = any; // You can type this better with Slate types

function renderNode(node: any, key: number): React.ReactNode {
  const children = (node.children || []).map((child: any, i: number) =>
    renderLeaf(child, i)
  );

  switch (node.type) {
    case "h1":
      return <h1 key={key}>{children}</h1>;
    case "h2":
      return <h2 key={key}>{children}</h2>;
    case "ul":
      return <ul key={key}>{children}</ul>;
    case "ol":
      return <ol key={key}>{children}</ol>;
    case "li":
      return <li key={key}>{children}</li>;
    case "link":
      return (
        <a href={node.url} key={key}>
          {children}
        </a>
      );
    case "quote":
      return <blockquote key={key}>{children}</blockquote>;
    case "paragraph":
    default:
      return <p key={key}>{children}</p>;
  }
}

function renderLeaf(leaf: any, key: number) {
  let text = leaf.text;

  if (!text) return null;

  if (leaf.bold) {
    text = <strong key={key}>{text}</strong>;
  }

  if (leaf.italic) {
    text = <em key={key}>{text}</em>;
  }

  if (leaf.underline) {
    text = <u key={key}>{text}</u>;
  }

  return <React.Fragment key={key}>{text}</React.Fragment>;
}

export function RichTextRenderer({ content }: { content: Node[] }) {
  if (!content) return null;

  return <>{content.map((node, i) => renderNode(node, i))}</>;
}
