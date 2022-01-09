import React from "react";
import Image from "next/image";
import Link from "next/link";
// components
import { Card, CardHeader, CardBody } from "../components/card";
import { Button } from "../components/button";
import { Title, Text } from "../components/text";
import Tag from "../components/tag";
// images
import ArrowUpIcon from "../public/images/icon-arrow-up.svg";
import ArrowUpIconHover from "../public/images/ArrowWhite.svg";
import CommentIcon from "../public/images/icon-comments.svg";
// utils
import { StyleSheet } from "../utils/style-sheet";

const { darkBlue2, gray3, bold, h3, boxShadow } = StyleSheet;

export default function FeedbackCard({ data, hoverCard, vote, withLink }) {
  return (
    <Card boxShadow={hoverCard && boxShadow} className="suggetions-container">
      <CardBody className="suggestion-body">
        <div>
          <Button
            display="flex"
            padding="12px"
            minWidth="45px"
            icon={ArrowUpIcon.src}
            iconHover={ArrowUpIconHover.src}
            onClick={vote}
          >
            {data.upvotes}
          </Button>
        </div>
        <div>
          {withLink ? (
            <Link href={`feedback/${data.id}`} passHref>
              <Title fontSize={h3} textColor={darkBlue2}>
                {data.title}
              </Title>
            </Link>
          ) : (
            <Title fontSize={h3} textColor={darkBlue2}>
              {data.title}
            </Title>
          )}
          <Text textColor={gray3}>{data.description}</Text>
          <Tag
            margin="10px 0"
            textTransform={
              data.category === "ux" || data.category === "ui"
                ? "uppercase"
                : "capitalize"
            }
          >
            {data.category}
          </Tag>
        </div>
        <CardHeader height="100%">
          <Image
            src={CommentIcon}
            alt={"comment"}
            className="comment-icon"
            priority={true}
          />
          <Text textColor={darkBlue2} fontWeight={bold} icon={CommentIcon.src}>
            {data.comments.length}
          </Text>
        </CardHeader>
      </CardBody>
    </Card>
  );
}
