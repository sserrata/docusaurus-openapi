/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import { ApiItem } from "../types";
import { createDescription } from "./createDescription";
import { createFullWidthTable } from "./createFullWidthTable";
import { createSchemaTable } from "./createSchemaTable";
import { createDetails } from "./createDetails";
import { createDetailsSummary } from "./createDetailsSummary";
import { create } from "./utils";
import { parse } from "path/posix";

interface Props {
  responses: ApiItem["responses"];
}

export function createStatusCodesTable({ responses }: Props) {
  if (responses === undefined) {
    return undefined;
  }

  const codes = Object.keys(responses);
  if (codes.length === 0) {
    return undefined;
  }

  return create("div", {
    children: [
      create("h4", { children: "Responses" }),
      create("div", {
        children: codes.map((code) =>
          create("div", {
            children: [
              createDetails({
                className:
                  parseInt(code) >= 400
                    ? "alert--danger"
                    : parseInt(code) >= 200 && parseInt(code) < 300
                    ? "alert--success"
                    : "alert--warning",
                children: [
                  createDetailsSummary({
                    children: create("span", {
                      children: [
                        create("code", {
                          children: code,
                          style: {
                            display: "inline-block",
                            marginRight: "8px",
                          },
                        }),
                        create("div", {
                          children: createDescription(
                            responses[code].description
                          ),
                          style: { display: "inline-block" },
                        }),
                      ],
                    }),
                  }),
                  create("div", {
                    children: createSchemaTable({
                      style: {
                        marginTop: "var(--ifm-table-cell-padding)",
                        marginBottom: "0px",
                      },
                      title: "Schema",
                      body: {
                        content: responses[code].content,
                      },
                    }),
                  }),
                ],
              }),
            ],
          })
        ),
      }),
    ],
  });
}
