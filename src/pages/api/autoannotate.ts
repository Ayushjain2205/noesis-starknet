// utils/anthropic.js
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// utils/prompts.js
export const annotationPrompts = {
  general: `Please analyze this image and provide detailed annotations. Focus on:
    1. Main objects and their locations
    2. Actions or activities occurring
    3. Notable attributes (colors, sizes, conditions)
    4. Spatial relationships between objects
    5. Any text visible in the image`,

  medical: `Provide detailed medical image annotations. Focus on:
    1. Anatomical structures present
    2. Abnormalities or pathologies
    3. Measurements and dimensions
    4. Tissue characteristics
    5. Notable findings requiring attention`,

  retail: `Analyze this retail product image. Focus on:
    1. Product identification and category
    2. Brand names and logos
    3. Product condition and quality
    4. Packaging details
    5. Any defects or damage`,

  security: `Analyze this security/surveillance image. Focus on:
    1. Suspicious activities or behavior
    2. Identification of individuals (clothing, features)
    3. Timestamp and environmental conditions
    4. Vehicle details if present
    5. Any security-relevant objects or actions`,

  automotive: `Analyze this vehicle image. Focus on:
    1. Make, model, and year estimation
    2. Exterior condition assessment
    3. Visible damage or modifications
    4. Safety features visible
    5. Interior details if visible`,

  real_estate: `Analyze this property image. Focus on:
    1. Room type and dimensions
    2. Architectural features
    3. Condition of walls, floors, fixtures
    4. Natural light and views
    5. Notable amenities or upgrades`,

  manufacturing: `Analyze this manufacturing/production image. Focus on:
    1. Product assembly quality
    2. Defect detection
    3. Component alignment
    4. Surface finish quality
    5. Measurement compliance`,

  agriculture: `Analyze this agricultural image. Focus on:
    1. Crop health indicators
    2. Growth stage assessment
    3. Disease or pest presence
    4. Soil conditions
    5. Environmental factors`,

  wildlife: `Analyze this wildlife/nature image. Focus on:
    1. Species identification
    2. Behavior and activity
    3. Habitat characteristics
    4. Health condition
    5. Interaction with environment`,

  document: `Analyze this document image. Focus on:
    1. Document type and format
    2. Key information fields
    3. Signatures or stamps
    4. Document quality/legibility
    5. Security features if present`,

  fashion: `Analyze this fashion/apparel image. Focus on:
    1. Garment type and style
    2. Fabric and materials
    3. Fit and construction
    4. Design details
    5. Condition and quality`,

  food: `Analyze this food/culinary image. Focus on:
    1. Dish identification
    2. Ingredients visible
    3. Preparation method
    4. Presentation quality
    5. Portion size and plating`,
};

// pages/api/annotate.js
import { NextResponse } from "next/server";
import { anthropic } from "@/utils/anthropic";
import { annotationPrompts } from "@/utils/prompts";

export const config = {
  api: {
    bodySize: "10mb",
  },
};

async function generateCustomPrompt(imageType, customInstructions) {
  const basePrompt = annotationPrompts[imageType] || annotationPrompts.general;
  return customInstructions
    ? `${basePrompt}\n\nAdditional instructions:\n${customInstructions}`
    : basePrompt;
}

export async function POST(req) {
  try {
    const {
      image,
      imageType = "general",
      format = "json",
      customInstructions = "",
      confidenceScores = false,
      detailedAnalysis = false,
      measurements = false,
    } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: "Image data is required" },
        { status: 400 }
      );
    }

    // Build analysis options
    let analysisPrompt = await generateCustomPrompt(
      imageType,
      customInstructions
    );

    if (confidenceScores) {
      analysisPrompt +=
        "\n\nPlease provide confidence scores (0-100%) for each annotation.";
    }

    if (detailedAnalysis) {
      analysisPrompt += "\n\nProvide detailed reasoning for each annotation.";
    }

    if (measurements) {
      analysisPrompt +=
        "\n\nInclude approximate measurements and dimensions where relevant.";
    }

    // Convert base64 to message content format
    const imageContent = {
      type: "image",
      source: {
        type: "base64",
        media_type: "image/jpeg",
        data: image,
      },
    };

    // Get annotations from Claude
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: analysisPrompt }, imageContent],
        },
      ],
    });

    if (format === "json") {
      // Parse the response into structured JSON
      const structuredAnnotations = {
        timestamp: new Date().toISOString(),
        imageType,
        metadata: {
          annotationType: imageType,
          confidenceScoresIncluded: confidenceScores,
          detailedAnalysisIncluded: detailedAnalysis,
          measurementsIncluded: measurements,
          customInstructions: customInstructions || undefined,
        },
        annotations: parseAnnotations(message.content[0].text),
      };

      return NextResponse.json(structuredAnnotations);
    } else {
      // Return raw text format
      return NextResponse.json({
        timestamp: new Date().toISOString(),
        imageType,
        metadata: {
          annotationType: imageType,
          confidenceScoresIncluded: confidenceScores,
          detailedAnalysisIncluded: detailedAnalysis,
          measurementsIncluded: measurements,
          customInstructions: customInstructions || undefined,
        },
        annotations: message.content[0].text,
      });
    }
  } catch (error) {
    console.error("Annotation error:", error);
    return NextResponse.json(
      { error: "Failed to process image annotation" },
      { status: 500 }
    );
  }
}

function parseAnnotations(text) {
  const sections = text.split("\n\n");
  const annotations = [];

  let currentCategory = "";

  for (const section of sections) {
    const lines = section.trim().split("\n");

    for (const line of lines) {
      if (/^\d+\./.test(line)) {
        const annotation = {
          category: currentCategory,
          content: line.replace(/^\d+\.\s*/, "").trim(),
        };

        // Extract confidence score if present
        const confidenceMatch = annotation.content.match(
          /\((\d+)%\s+confidence\)/i
        );
        if (confidenceMatch) {
          annotation.confidence = parseInt(confidenceMatch[1]);
          annotation.content = annotation.content
            .replace(/\(\d+%\s+confidence\)/i, "")
            .trim();
        }

        annotations.push(annotation);
      } else if (line.trim().length > 0) {
        currentCategory = line.trim().replace(/:$/, "");
      }
    }
  }

  return annotations;
}
