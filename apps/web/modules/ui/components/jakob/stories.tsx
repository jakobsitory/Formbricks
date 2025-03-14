import type { Meta, StoryObj } from "@storybook/react";
import { AlertButton, AlertDescription, AlertJakob, AlertTitle } from "./index";

// Updated story args type: removed booleans and instead use a buttonText prop.
interface AlertJakobStoryArgs
  extends Omit<React.ComponentProps<typeof AlertJakob>, "children" | "icon" | "button"> {
  title: string;
  description: string;
  buttonText?: string;
}

const meta: Meta<AlertJakobStoryArgs> = {
  title: "ui/AlertJakob",
  component: AlertJakob,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error", "warning", "info", "success"],
    },
    title: { control: "text" },
    description: { control: "text" },
    buttonText: { control: "text" },
  },
  args: {
    variant: "default",
    title: "Heads up!",
    description: "This is an alert.",
    buttonText: "Learn more",
  },
  render: (args) => {
    const { title, description, buttonText, ...rest } = args;
    return (
      <AlertJakob
        {...rest}
        // Using default icon if none is provided so the variant styling applies.
        icon={undefined}
        button={buttonText ? <AlertButton>{buttonText}</AlertButton> : undefined}>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </AlertJakob>
    );
  },
};

export default meta;

type Story = StoryObj<AlertJakobStoryArgs>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    variant: "error",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
  },
};
